import Link from 'next/link';
import Nav from '../../components/Nav';

export default function Play() {
  return (
    <main className="page">
      <Nav />

      <section className="section">
        <h1>Choose Your Perfect Season</h1>
        <p className="subtitle">
          Pick a league, draw a random team from a specific season, choose players from that exact roster, and chase the perfect record.
        </p>
      </section>

      <section className="grid">
        <Link className="card" href="/play/nba">
          <div className="stat">🏀</div>
          <h2>NBA 82-0</h2>
          <p className="muted">
            Draw specific NBA team seasons like 1996 Chicago Bulls or 2001 Los Angeles Lakers.
            Casual mode gives you 3 re-spins.
          </p>
        </Link>

        <Link className="card" href="/play/nfl">
          <div className="stat">🏈</div>
          <h2>NFL 17-0</h2>
          <p className="muted">
            Draw specific NFL team seasons and build your offense. Add a Team Defense from a specific year.
            Casual mode gives you 6 re-spins.
          </p>
        </Link>

        <Link className="card" href="/play/mlb">
          <div className="stat">⚾</div>
          <h2>MLB 162-0</h2>
          <p className="muted">
            Draw specific MLB team seasons and build a full lineup, rotation, and bullpen.
            Casual mode gives you 5 re-spins.
          </p>
        </Link>
      </section>

      <section className="section">
        <div className="card">
          <span className="pill">Ultimate Mode</span>
          <h2>No Re-Spins. Every Draw Counts.</h2>
          <p className="muted">
            Ultimate Mode removes all re-spins. Every team season you draw is final.
            This is where leaderboard teams are ranked.
          </p>
        </div>
      </section>
    </main>
  );
}
