import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <main className="page">
      <Nav />
      <section className="hero">
        <div>
          <div className="eyebrow">NBA • NFL • MLB</div>
          <h1>Can you build The Perfect Season?</h1>
          <p className="subtitle">
            Draft players from random teams and eras, build an all-time roster, and simulate your way toward 82-0, 17-0, or 162-0.
          </p>
          <div className="buttons">
            <Link className="btn" href="/play">Play Free</Link>
            <Link className="btn secondary" href="/pricing">View Pro Mode</Link>
          </div>
        </div>
        <div className="card">
          <span className="pill">Ultimate Mode</span>
          <h2>No re-spins. No excuses.</h2>
          <p className="muted">Every Team + Era draw is final. Build the best roster possible and compete for leaderboard immortality.</p>
          <div className="stat">0</div>
          <p className="small">Re-spins allowed in Ultimate Mode</p>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <div className="stat">82-0</div>
          <h3>NBA Season</h3>
          <p className="muted">Build a 6-man NBA roster with 3 re-spins in casual mode.</p>
        </div>
        <div className="card">
          <div className="stat">17-0</div>
          <h3>NFL Season</h3>
          <p className="muted">Draft offense plus Team Defense + Decade with 6 re-spins.</p>
        </div>
        <div className="card">
          <div className="stat">162-0</div>
          <h3>MLB Season</h3>
          <p className="muted">Build a lineup, rotation, and bullpen with 5 re-spins.</p>
        </div>
      </section>
    </main>
  );
}
