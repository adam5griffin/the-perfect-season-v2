'use client';

import { useState } from 'react';
import Nav from '../../../components/Nav';
import {
  sports,
  SportKey,
  getRandomSeason,
  getRandomSeasonByTeam,
  SeasonTeam,
} from '../../../lib/gameData';

export default function SportGame({ params }: { params: { sport: SportKey } }) {
  const sport = sports[params.sport] || sports.nba;

  const [selectedSeason, setSelectedSeason] = useState<SeasonTeam>(() =>
    getRandomSeason(params.sport)
  );

  const [mode, setMode] = useState<'casual' | 'ultimate'>('casual');
  const [reSpins, setReSpins] = useState<number>(sport.reSpins);

  const currentReSpins = mode === 'ultimate' ? 0 : reSpins;

  function resetGame(nextMode = mode) {
    setSelectedSeason(getRandomSeason(params.sport));
    setReSpins(nextMode === 'ultimate' ? 0 : sport.reSpins);
  }

  function reSpinTeam() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(getRandomSeason(params.sport));
    setReSpins(reSpins - 1);
  }

  function reSpinYear() {
    if (currentReSpins <= 0) return;

    setSelectedSeason(
      getRandomSeasonByTeam(params.sport, selectedSeason.team)
    );

    setReSpins(reSpins - 1);
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
          Draw a specific team season, choose the best player from that exact roster,
          and chase the perfect regular season.
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
              New Draw
            </button>
          </div>

          <p className="small">Re-spins remaining: {currentReSpins}</p>
        </div>

        <div className="card">
          <h2>Available Players</h2>

          <div className="mode-list">
            {selectedSeason.players.map((player) => (
              <div key={player.name} className="card">
                <strong>{player.name}</strong>
                <p className="small">{player.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Your Roster</h2>

          <div className="mode-list">
            {sport.roster.map((slot) => (
              <div key={slot} className="card">
                <strong>{slot}</strong>
                <p className="small">Empty slot</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
