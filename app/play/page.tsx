import Link from 'next/link';
import Nav from '../../components/Nav';

export default function Play() {
  return (
    <main className="page">
      <Nav />

      <section className="section">
        <h1>Choose Your Perfect Season</h1>

        <p className="subtitle">
          Pick a league, draw a random team from a specific season, choose
          players from that exact roster, and chase the perfect record.
        </p>
      </section>

      <section className="grid">
        <Link className="card" href="/play/nba">
          <div className="stat">🏀</div>
          <h2>NBA 82-0</h2>
          <p className="muted">
            Draw specific NBA team seasons and build a roster with 3 re-spins
            in casual mode.
          </p>
        </Link>

        <Link className="card" href="/play/nfl">
          <div className="stat">🏈</div>
          <h2>NFL 17-0</h2>
          <p className="muted">
            Draw specific NFL team seasons, build your offense, and add a Team
            Defense with 6 re-spins.
          </p>
        </Link>

        <Link className="card" href="/play/mlb">
          <div className="stat">⚾</div>
          <h2>MLB 162-0</h2>
          <p className="muted">
            Draw specific MLB team seasons and build a lineup, rotation, and
            bullpen with 5 re-spins.
          </p>
        </Link>
      </section>

      <section className="section">
        <div className="card">
          <span className="pill">Ultimate Mode</span>
          <h2>No Re-Spins. Every Draw Counts.</h2>
          <p className="muted">
            Ultimate Mode removes all re-spins. Every team-season draw is final.
            This is where leaderboard teams are ranked.
          </p>
        </div>
      </section>
    </main>
  );
}
