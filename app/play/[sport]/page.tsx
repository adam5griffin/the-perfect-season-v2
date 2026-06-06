'use client';

import { useMemo, useState } from 'react';
import Nav from '../../../components/Nav';
import { sports, SportKey, randomItem } from '../../../lib/gameData';

export default function SportGame({ params }: { params: { sport: SportKey } }) {
  const sport = sports[params.sport] || sports.nba;
  const [team, setTeam] = useState(() => randomItem(sport.teams));
  const [season, setSeason] = useState(() => randomItem(sport.seasons));
  const [mode, setMode] = useState<'casual' | 'ultimate'>('casual');
  const [reSpins, setReSpins] = useState<number>(sport.reSpins);

  const currentReSpins = mode === 'ultimate' ? 0 : reSpins;

  function resetGame(nextMode = mode) {
    setTeam(randomItem(sport.teams));
    setSeason(randomItem(sport.seasons));
    setReSpins(nextMode === 'ultimate' ? 0 : sport.reSpins);
  }

  function reSpinTeam() {
    if (currentReSpins <= 0) return;
    setTeam(randomItem(sport.teams));
    setReSpins(reSpins - 1);
  }

  function reSpinSeason() {
    if (currentReSpins <= 0) return;
    setSeason(randomItem(sport.seasons));
    setReSpins(reSpins - 1);
  }

  return (
    <main className="page">
      <Nav />
      <section className="section">
        <span className="pill">{sport.name} Mode</span>
        <h1>{sport.name} {sport.perfectRecord}</h1>
        <p className="subtitle">Spin a Team + Era, choose the best player available, and chase the perfect regular season.</p>
        <div className="buttons">
          <button className="btn" onClick={() => { setMode('casual'); resetGame('casual'); }}>Casual Mode</button>
          <button className="btn secondary" onClick={() => { setMode('ultimate'); resetGame('ultimate'); }}>Ultimate Mode</button>
        </div>
      </section>

      <section className="game-shell">
        <div className="card draw-box">
          <p className="eyebrow">{mode === 'ultimate' ? 'Ultimate Mode' : 'Casual Mode'}</p>
          <div className="draw">{season}</div>
          <p className="muted">Choose a player from this season's roster.</p>
          <div className="buttons">
            <button className="btn secondary" onClick={reSpinTeam}>Re-spin Team</button>
            <button className="btn secondary" onClick={reSpinSeason}>Re-spin Season</button>
            <button className="btn" onClick={() => resetGame(mode)}>New Draw</button>
          </div>
          <p className="small">Re-spins remaining: {currentReSpins}</p>
        </div>

        <div className="card">
          <h2>Roster Slots</h2>
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
