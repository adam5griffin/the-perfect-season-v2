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

function findRosterSlot(player: Player, rosterSlots: readonly string[]) {
  const position = player.position;

  if (rosterSlots.includes(position)) {
    return position;
  }

  if (position === 'WR' && rosterSlots.includes('WR1')) {
    return 'WR1';
  }

  if (position === 'RB' && rosterSlots.includes('RB')) {
    return 'RB';
  }

  if (position === 'TE' && rosterSlots.includes('TE')) {
    return 'TE';
  }

  if (position === 'QB' && rosterSlots.includes('QB')) {
    return 'QB';
  }

  if (position === 'OL' && rosterSlots.includes('Offensive Line')) {
    return 'Offensive Line';
  }

  if (position === 'DEF' && rosterSlots.includes('Team Defense')) {
    return 'Team Defense';
  }

  if (position === 'RP' && rosterSlots.includes('Bullpen')) {
    return 'Bullpen';
  }

  if (position === 'Bullpen' && rosterSlots.includes('Bullpen')) {
    return 'Bullpen';
  }

  return rosterSlots.find((slot) => !slot.includes('SP')) || rosterSlots[0];
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
  const [userRoster, setUserRoster] = useState<Record<string, Player | null>>(
    () =>
      Object.fromEntries(
        sport.roster.map((slot) => [slot, null])
      ) as Record<string, Player | null>
  );

  const currentReSpins = mode === 'ultimate' ? 0 : reSpins;
  const rosterIsFull = sport.roster.every((slot) => userRoster[slot]);

  function resetRoster() {
    setUserRoster(
      Object.fromEntries(
        sport.roster.map((slot) => [slot, null])
      ) as Record<string, Player | null>
    );
  }

  function resetGame(nextMode = mode) {
    setSelectedSeason(getRandomSeason(sportKey));
    setReSpins(nextMode === 'ultimate' ? 0 : sport.reSpins);
    resetRoster();
  }

  function reSpinTeam() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(getRandomSeason(sportKey));
    setReSpins((current) => current - 1);
  }

  function reSpinYear() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(getRandomSeasonByTeam(sportKey, selectedSeason.team));
    setReSpins((current) => current - 1);
  }

  function selectPlayer(player: Player) {
    const slot = findRosterSlot(player, sport.roster);

    setUserRoster((currentRoster) => {
      if (currentRoster[slot]) {
        return currentRoster;
      }

      return {
        ...currentRoster,
        [slot]: player,
      };
    });

    setSelectedSeason(getRandomSeason(sportKey));
  }

  function simulateSeason() {
    if (!rosterIsFull) return;

    let maxWins = 0;
    let minLosses = 0;

    if (sportKey === 'nba') {
      maxWins = 82;
    }

    if (sportKey === 'nfl') {
      maxWins = 17;
    }

    if (sportKey === 'mlb') {
      maxWins = 162;
    }

    const randomLosses = Math.floor(Math.random() * 8);
    minLosses = randomLosses;
    const wins = Math.max(maxWins - minLosses, 0);

    alert(`Final Record: ${wins}-${minLosses}`);
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
            {selectedSeason.players.map((player) => (
              <button
                key={`${selectedSeason.id}-${player.name}`}
                className="card"
                onClick={() => selectPlayer(player)}
                style={{
                  textAlign: 'left',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <strong>{player.name}</strong>
                <p className="small">{player.position}</p>
              </button>
            ))}
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
            <p className="small">
              Fill every roster slot to simulate the season.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
