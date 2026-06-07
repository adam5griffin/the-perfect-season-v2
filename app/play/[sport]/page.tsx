'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from '../../../components/Nav';
import {
  sports,
  SportKey,
  getRandomSeason,
  getRandomSeasonByTeam,
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

  // NBA fallback logic
  if (position === 'PG' && rosterSlots.includes('PG')) options.push('PG');
  if (position === 'SG' && rosterSlots.includes('SG')) options.push('SG');
  if (position === 'SF' && rosterSlots.includes('SF')) options.push('SF');
  if (position === 'PF' && rosterSlots.includes('PF')) options.push('PF');
  if (position === 'C' && rosterSlots.includes('C')) options.push('C');

  if (
    ['PG', 'SG', 'SF', 'PF', 'C'].includes(position) &&
    rosterSlots.includes('6th Man')
  ) {
    options.push('6th Man');
  }

  // NFL fallback logic
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

  // MLB fallback logic
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

export default function SportGame() {
  const params = useParams();
  const rawSport = params.sport;

  const sportKey: SportKey =
    typeof rawSport === 'string' && isValidSport(rawSport) ? rawSport : 'nba';

  const sport = sports[sportKey];

  const [selectedSeason, setSelectedSeason] = useState<SeasonTeam>(() =>
    getRandomSeason(sportKey)
  );

  const [mode, setMode] = useState<'casual' | 'ultimate'>('casual');
  const [reSpins, setReSpins] = useState<number>(sport.reSpins);
  const [finalRecord, setFinalRecord] = useState<string | null>(null);

  const [userRoster, setUserRoster] = useState<Record<string, Player | null>>(
    () => createEmptyRoster(sport.roster)
  );

  const currentReSpins = mode === 'ultimate' ? 0 : reSpins;
  const rosterIsFull = sport.roster.every((slot) => userRoster[slot]);

  function resetRoster() {
    setUserRoster(createEmptyRoster(sport.roster));
  }

  function resetGame(nextMode = mode) {
    setSelectedSeason(getRandomSeason(sportKey));
    setReSpins(nextMode === 'ultimate' ? 0 : sport.reSpins);
    setFinalRecord(null);
    resetRoster();
  }

  function reSpinTeam() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(getRandomSeason(sportKey));
    setReSpins((current) => Math.max(current - 1, 0));
    setFinalRecord(null);
  }

  function reSpinYear() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(getRandomSeasonByTeam(sportKey, selectedSeason.team));
    setReSpins((current) => Math.max(current - 1, 0));
    setFinalRecord(null);
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

    setSelectedSeason(getRandomSeason(sportKey));
    setFinalRecord(null);
  }

  function removePlayer(slot: string) {
    setUserRoster((currentRoster) => ({
      ...currentRoster,
      [slot]: null,
    }));

    setFinalRecord(null);
  }

  function simulateSeason() {
    if (!rosterIsFull) return;

    let games = 82;

    if (sportKey === 'nfl') {
      games = 17;
    }

    if (sportKey === 'mlb') {
      games = 162;
    }

    const losses = Math.floor(Math.random() * 8);
    const wins = games - losses;

    setFinalRecord(`${wins}-${losses}`);
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
            className="btn"
            onClick={() => {
              setMode('casual');
              resetGame('casual');
            }}
          >
            Casual Mode
          </button>

          <button
            className="btn secondary"
            onClick={() => {
              setMode('ultimate');
              resetGame('ultimate');
            }}
          >
            Ultimate Mode
          </button>
        </div>
      </section>

      <section className="game-shell">
        <div className="card draw-box">
          <p className="eyebrow">
            {mode === 'ultimate' ? 'Ultimate Mode' : 'Casual Mode'}
          </p>

          <div className="draw">{selectedSeason.displayName}</div>

          <p className="muted">
            Choose one player from the {selectedSeason.displayName} roster.
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

          <p className="small">Re-spins remaining: {currentReSpins}</p>
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
                  <p className="small">{player.position}</p>
                  {alreadySelected && (
                    <p className="small">Already selected</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h2>Your Roster</h2>

          <div className="mode-list">
            {sport.roster.map((slot) => (
              <div key={slot} className="card">
                <strong>{slot}</strong>

                <p className="small">
                  {userRoster[slot]
                    ? `${userRoster[slot]?.name} — ${userRoster[slot]?.position}`
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

          {!rosterIsFull && (
            <p className="small">Fill every roster slot to simulate.</p>
          )}

          {finalRecord && (
            <div className="card">
              <span className="pill">Final Record</span>
              <div className="stat">{finalRecord}</div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
