import Link from 'next/link';
import Nav from '../../components/Nav';

export default function Play() {
  return (
    <main className="page">
      <Nav />
      <section className="section">
        <h1>Choose Your Season</h1>
        <p className="subtitle">Start with free regular-season gameplay. Championship League comes in Phase 2.</p>
      </section>
      <section className="grid">
        <Link className="card" href="/play/nba">
          <div className="stat">🏀</div>
          <h2>NBA 82-0</h2>
          <p className="muted">3 re-spins in casual mode.</p>
        </Link>
        <Link className="card" href="/play/nfl">
          <div className="stat">🏈</div>
          <h2>NFL 17-0</h2>
          <p className="muted">6 re-spins plus Team Defense + Decade.</p>
        </Link>
        <Link className="card" href="/play/mlb">
          <div className="stat">⚾</div>
          <h2>MLB 162-0</h2>
          <p className="muted">5 re-spins for team or era.</p>
        </Link>
      </section>
    </main>
  );
}
