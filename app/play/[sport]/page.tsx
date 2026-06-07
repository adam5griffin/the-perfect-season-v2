'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from '../../../components/Nav';
import { getTeamColors } from '../../../lib/teamColors';
import {
  sports,
  SportKey,
  getRandomSeason,
  getRandomSeasonByTeam,
  getRandomFeaturedSeason,
  getRandomFeaturedSeasonByTeam,
  SeasonTeam,
  Player,
} from '../../../lib/gameData';

function isValidSport(value: string): value is SportKey {
  return value === 'nba' || value === 'nfl' || value === 'mlb';
}

function createEmptyRoster(
  rosterSlots: readonly string[]
): Record<string, Player | null> {
  return Object.fromEntries(
    rosterSlots.map((slot) => [slot, null])
  ) as Record<string, Player | null>;
}

function getPlayerSlotOptions(player: Player, rosterSlots: readonly string[]) {
  const position = player.position;
  const options: string[] = [];

  if (rosterSlots.includes(position)) {
    options.push(position);
  }

  if (['PG', 'SG', 'SF', 'PF', 'C'].includes(position)) {
    if (rosterSlots.includes(position)) options.push(position);
    if (rosterSlots.includes('6th Man')) options.push('6th Man');
  }

  if (position === 'QB' && rosterSlots.includes('QB')) options.push('QB');

  if (position === 'RB') {
    if (rosterSlots.includes('RB')) options.push('RB');
    if (rosterSlots.includes('FLEX')) options.push('FLEX');
  }

  if (position === 'WR') {
    if (rosterSlots.includes('WR1')) options.push('WR1');
    if (rosterSlots.includes('WR2')) options.push('WR2');
    if (rosterSlots.includes('FLEX')) options.push('FLEX');
  }

  if (position === 'TE') {
    if (rosterSlots.includes('TE')) options.push('TE');
    if (rosterSlots.includes('FLEX')) options.push('FLEX');
  }

  if (position === 'OL' && rosterSlots.includes('Offensive Line')) {
    options.push('Offensive Line');
  }

  if (position === 'DEF' && rosterSlots.includes('Team Defense')) {
    options.push('Team Defense');
  }

  if (position === 'SP') {
    rosterSlots.forEach((slot) => {
      if (slot.startsWith('SP')) options.push(slot);
    });
  }

  if (
    (position === 'RP' || position === 'Bullpen') &&
    rosterSlots.includes('Bullpen')
  ) {
    options.push('Bullpen');
  }

  return [...new Set(options)];
}

function findOpenRosterSlot(
  player: Player,
  rosterSlots: readonly string[],
  currentRoster: Record<string, Player | null>
) {
  const slotOptions = getPlayerSlotOptions(player, rosterSlots);
  const openMatchingSlot = slotOptions.find((slot) => !currentRoster[slot]);

  if (openMatchingSlot) {
    return openMatchingSlot;
  }

  const firstOpenSlot = rosterSlots.find((slot) => !currentRoster[slot]);
  return firstOpenSlot || null;
}

function calculateAverageRating(players: Player[]) {
  if (players.length === 0) return 0;
  const total = players.reduce((sum, player) => sum + player.rating, 0);
  return Math.round(total / players.length);
}

function calculateRosterRating(roster: Record<string, Player | null>) {
  const players = Object.values(roster).filter(Boolean) as Player[];
  return calculateAverageRating(players);
}

function calculateOffenseRating(
  sportKey: SportKey,
  roster: Record<string, Player | null>
) {
  let offenseSlots: string[] = [];

  if (sportKey === 'nba') offenseSlots = ['PG', 'SG', 'SF', 'PF', 'C', '6th Man'];
  if (sportKey === 'nfl') offenseSlots = ['QB', 'RB', 'WR1', 'WR2', 'TE', 'FLEX', 'Offensive Line'];
  if (sportKey === 'mlb') offenseSlots = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  const players = offenseSlots
    .map((slot) => roster[slot])
    .filter(Boolean) as Player[];

  return calculateAverageRating(players);
}

function calculateDefenseRating(
  sportKey: SportKey,
  roster: Record<string, Player | null>
) {
  let defenseSlots: string[] = [];

  if (sportKey === 'nba') defenseSlots = ['C', 'PF', 'SF'];
  if (sportKey === 'nfl') defenseSlots = ['Team Defense'];
  if (sportKey === 'mlb') defenseSlots = ['SP1', 'SP2', 'SP3', 'SP4', 'SP5', 'Bullpen'];

  const players = defenseSlots
    .map((slot) => roster[slot])
    .filter(Boolean) as Player[];

  return calculateAverageRating(players);
}

function calculatePerfectSeasonChance(
  sportKey: SportKey,
  overallRating: number,
  offenseRating: number,
  defenseRating: number
) {
  const balanceBonus = Math.max(
    0,
    10 - Math.abs(offenseRating - defenseRating)
  );

  const baseChance = overallRating - 70 + balanceBonus;

  if (sportKey === 'nfl') {
    return Math.min(99, Math.max(1, Math.round(baseChance * 2.2)));
  }

  if (sportKey === 'nba') {
    return Math.min(99, Math.max(1, Math.round(baseChance * 1.5)));
  }

  return Math.min(99, Math.max(1, Math.round(baseChance * 0.9)));
}

function calculateSeasonResult(
  sportKey: SportKey,
  overallRating: number,
  offenseRating: number,
  defenseRating: number
) {
  const games = sportKey === 'nba' ? 82 : sportKey === 'nfl' ? 17 : 162;

  const perfectChance = calculatePerfectSeasonChance(
    sportKey,
    overallRating,
    offenseRating,
    defenseRating
  );

  const ratingGap = Math.max(0, 100 - overallRating);
  const balancePenalty = Math.floor(Math.abs(offenseRating - defenseRating) / 6);

  const baseLosses =
    sportKey === 'nba'
      ? Math.round(ratingGap / 4)
      : sportKey === 'nfl'
      ? Math.round(ratingGap / 12)
      : Math.round(ratingGap / 2);

  const randomness = Math.floor(Math.random() * 4);

  const losses = Math.min(
    games,
    Math.max(0, baseLosses + balancePenalty + randomness)
  );

  const wins = games - losses;

  return {
    wins,
    losses,
    record: `${wins}-${losses}`,
    perfectChance,
  };
}

export default function SportGame() {
  const params = useParams();
  const rawSport = params.sport;

  const sportKey: SportKey =
    typeof rawSport === 'string' && isValidSport(rawSport) ? rawSport : 'nba';

  const sport = sports[sportKey];

  const [draftPool, setDraftPool] = useState<'all' | 'featured'>('all');

  function getNextRandomSeason(pool = draftPool) {
    if (pool === 'featured') {
      return getRandomFeaturedSeason(sportKey);
    }

    return getRandomSeason(sportKey);
  }

  function getNextRandomSeasonByTeam(team: string, pool = draftPool) {
    if (pool === 'featured') {
      return getRandomFeaturedSeasonByTeam(sportKey, team);
    }

    return getRandomSeasonByTeam(sportKey, team);
  }

  const [selectedSeason, setSelectedSeason] = useState<SeasonTeam>(() =>
    getRandomSeason(sportKey)
  );

  const colors = getTeamColors(selectedSeason.team);

  const [mode, setMode] = useState<'casual' | 'ultimate'>('casual');
  const [reSpins, setReSpins] = useState<number>(sport.reSpins);
  const [finalRecord, setFinalRecord] = useState<string | null>(null);
  const [finalRating, setFinalRating] = useState<number | null>(null);
  const [finalOffenseRating, setFinalOffenseRating] = useState<number | null>(null);
  const [finalDefenseRating, setFinalDefenseRating] = useState<number | null>(null);
  const [perfectSeasonChance, setPerfectSeasonChance] = useState<number | null>(null);

  const [userRoster, setUserRoster] = useState<Record<string, Player | null>>(
    () => createEmptyRoster(sport.roster)
  );

  const currentReSpins = mode === 'ultimate' ? 0 : reSpins;
  const filledSlots = sport.roster.filter((slot) => userRoster[slot]).length;
  const totalSlots = sport.roster.length;
  const rosterIsFull = filledSlots === totalSlots;

  const currentRating = calculateRosterRating(userRoster);
  const currentOffenseRating = calculateOffenseRating(sportKey, userRoster);
  const currentDefenseRating = calculateDefenseRating(sportKey, userRoster);
  const currentPerfectChance = calculatePerfectSeasonChance(
    sportKey,
    currentRating,
    currentOffenseRating,
    currentDefenseRating
  );

  function resetRoster() {
    setUserRoster(createEmptyRoster(sport.roster));
  }

  function clearResults() {
    setFinalRecord(null);
    setFinalRating(null);
    setFinalOffenseRating(null);
    setFinalDefenseRating(null);
    setPerfectSeasonChance(null);
  }

  function resetGame(nextMode = mode) {
    setSelectedSeason(getNextRandomSeason());
    setReSpins(nextMode === 'ultimate' ? 0 : sport.reSpins);
    clearResults();
    resetRoster();
  }

  function reSpinTeam() {
    if (currentReSpins <= 0) return;
    setSelectedSeason(getNextRandomSeason());
    setReSpins((current) => Math.max(current - 1, 0));
    clearResults();
  }

  function reSpinYear() {
    if (currentReSpins <= 0) return;
    setSelectedSeason(getNextRandomSeasonByTeam(selectedSeason.team));
    setReSpins((current) => Math.max(current - 1, 0));
    clearResults();
  }

  function switchDraftPool(nextPool: 'all' | 'featured') {
    setDraftPool(nextPool);
    setSelectedSeason(getNextRandomSeason(nextPool));
    clearResults();
  }

  function playerAlreadySelected(player: Player) {
    return Object.values(userRoster).some(
      (selectedPlayer) => selectedPlayer?.name === player.name
    );
  }

  function selectPlayer(player: Player) {
    if (playerAlreadySelected(player)) {
      alert(`${player.name} is already on your roster.`);
      return;
    }

    const slot = findOpenRosterSlot(player, sport.roster, userRoster);

    if (!slot) {
      alert('No open roster slot available.');
      return;
    }

    setUserRoster((currentRoster) => ({
      ...currentRoster,
      [slot]: player,
    }));

    setSelectedSeason(getNextRandomSeason());
    clearResults();
  }

  function removePlayer(slot: string) {
    setUserRoster((currentRoster) => ({
      ...currentRoster,
      [slot]: null,
    }));

    clearResults();
  }

  function simulateSeason() {
    if (!rosterIsFull) return;

    const rosterRating = calculateRosterRating(userRoster);
    const offenseRating = calculateOffenseRating(sportKey, userRoster);
    const defenseRating = calculateDefenseRating(sportKey, userRoster);

    const result = calculateSeasonResult(
      sportKey,
      rosterRating,
      offenseRating,
      defenseRating
    );

    setFinalRecord(result.record);
    setFinalRating(rosterRating);
    setFinalOffenseRating(offenseRating);
    setFinalDefenseRating(defenseRating);
    setPerfectSeasonChance(result.perfectChance);
  }

  function copyShareText() {
    const rosterText = sport.roster
      .map((slot) => `${slot}: ${userRoster[slot]?.name || 'Empty'}`)
      .join('\n');

    const shareText = `THE PERFECT SEASON
${sport.name} ${mode === 'ultimate' ? 'Ultimate Mode' : 'Casual Mode'}
Draft Pool: ${draftPool === 'featured' ? 'Featured Teams Only' : 'All Teams'}
Final Record: ${finalRecord}
Overall Rating: ${finalRating}
Offense Rating: ${finalOffenseRating}
Defense Rating: ${finalDefenseRating}
Perfect Season Chance: ${perfectSeasonChance}%

${rosterText}

Play now: https://the-perfect-season-v2.vercel.app`;

    navigator.clipboard.writeText(shareText);
    alert('Share card copied!');
  }

  return (
    <main className="page">
      <Nav />

      <section className="section">
        <span className="pill">{sport.name} Mode</span>

        <h1>
          {sport.name} {sport.perfectRecord}
        </h1>

        <p className="subtitle">
          Draw a specific team season, choose one player from that exact roster,
          and build your perfect team.
        </p>

        <div className="buttons">
          <button
            className={mode === 'casual' ? 'btn' : 'btn secondary'}
            onClick={() => {
              setMode('casual');
              resetGame('casual');
            }}
          >
            Casual Mode
          </button>

          <button
            className={mode === 'ultimate' ? 'btn' : 'btn secondary'}
            onClick={() => {
              setMode('ultimate');
              resetGame('ultimate');
            }}
          >
            Ultimate Mode
          </button>
        </div>

        <div className="buttons">
          <button
            className={draftPool === 'all' ? 'btn' : 'btn secondary'}
            onClick={() => switchDraftPool('all')}
          >
            All Teams
          </button>

          <button
            className={draftPool === 'featured' ? 'btn' : 'btn secondary'}
            onClick={() => switchDraftPool('featured')}
          >
            Featured Teams Only
          </button>
        </div>
      </section>

      <section className="game-shell">
        <div
          className="card draw-box"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.text,
            border: `1px solid ${colors.secondary}`,
          }}
        >
          <p className="eyebrow">
            {mode === 'ultimate' ? 'Ultimate Mode' : 'Casual Mode'}
          </p>

          <div className="draw">{selectedSeason.displayName}</div>

          {selectedSeason.isFeatured && <span className="pill">Featured Roster</span>}

          <p className="muted" style={{ color: colors.text }}>
            Pick {filledSlots + 1} of {totalSlots}. Choose one player from the{' '}
            {selectedSeason.displayName} roster.
          </p>

          <div className="buttons">
            <button className="btn secondary" onClick={reSpinTeam}>
              Re-spin Team
            </button>

            <button className="btn secondary" onClick={reSpinYear}>
              Re-spin Year
            </button>

            <button className="btn" onClick={() => resetGame(mode)}>
              New Game
            </button>
          </div>

          <p className="small" style={{ color: colors.text }}>
            Re-spins remaining: {currentReSpins}
          </p>
        </div>

        <div className="card">
          <h2>Available Players</h2>

          <div className="mode-list">
            {selectedSeason.players.map((player) => {
              const alreadySelected = playerAlreadySelected(player);

              return (
                <button
                  key={`${selectedSeason.id}-${player.name}`}
                  className="card"
                  onClick={() => selectPlayer(player)}
                  disabled={alreadySelected}
                  style={{
                    textAlign: 'left',
                    color: 'white',
                    cursor: alreadySelected ? 'not-allowed' : 'pointer',
                    opacity: alreadySelected ? 0.5 : 1,
                  }}
                >
                  <strong>{player.name}</strong>
                  <p className="small">
                    {player.position} • Rating {player.rating}
                  </p>

                  {player.stats && (
                    <p className="small">
                      {Object.entries(player.stats)
                        .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
                        .join(' • ')}
                    </p>
                  )}

                  {alreadySelected && <p className="small">Already selected</p>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h2>Your Roster</h2>

          <p className="small">
            Roster: {filledSlots} / {totalSlots} filled
          </p>

          <p className="small">Overall Rating: {currentRating}</p>
          <p className="small">Offense Rating: {currentOffenseRating}</p>
          <p className="small">Defense Rating: {currentDefenseRating}</p>
          <p className="small">
            Perfect Season Chance: {currentPerfectChance}%
          </p>

          <div className="mode-list">
            {sport.roster.map((slot) => (
              <div key={slot} className="card">
                <strong>{slot}</strong>

                <p className="small">
                  {userRoster[slot]
                    ? `${userRoster[slot]?.name} — ${userRoster[slot]?.position} — Rating ${userRoster[slot]?.rating}`
                    : 'Empty slot'}
                </p>

                {userRoster[slot] && (
                  <button
                    className="btn secondary"
                    onClick={() => removePlayer(slot)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="buttons">
            <button
              className={rosterIsFull ? 'btn' : 'btn secondary'}
              onClick={simulateSeason}
              disabled={!rosterIsFull}
            >
              Simulate Season
            </button>
          </div>

          {!rosterIsFull && <p className="small">Fill every roster slot to simulate.</p>}

          {finalRecord && (
            <div
              className="card"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: colors.text,
                border: `1px solid ${colors.secondary}`,
              }}
            >
              <span className="pill">Share Card</span>

              <h2>THE PERFECT SEASON</h2>

              <p className="muted" style={{ color: colors.text }}>
                {sport.name}{' '}
                {mode === 'ultimate' ? 'Ultimate Mode' : 'Casual Mode'}
              </p>

              <div className="stat">{finalRecord}</div>

              <p className="small" style={{ color: colors.text }}>
                Overall Rating: {finalRating}
              </p>

              <p className="small" style={{ color: colors.text }}>
                Offense Rating: {finalOffenseRating}
              </p>

              <p className="small" style={{ color: colors.text }}>
                Defense Rating: {finalDefenseRating}
              </p>

              <p className="small" style={{ color: colors.text }}>
                Perfect Season Chance: {perfectSeasonChance}%
              </p>

              <button className="btn" onClick={copyShareText}>
                Copy Share Card
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
