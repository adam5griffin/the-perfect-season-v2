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
            Draw players from specific team seasons, build an all-time roster,
            and simulate your way toward 82-0, 17-0, or 162-0.
          </p>

          <div className="buttons">
            <Link className="btn" href="/play">
              Play Free
            </Link>

            <Link className="btn secondary" href="/pricing">
              View Pro Mode
            </Link>
          </div>
        </div>

        <div className="card hero-art-card">
          <img
            src="/6CABEE02-7EE0-4FAC-A914-A01E08B93205.png"
            alt="Perfect Season sports artwork"
            className="hero-art"
          />
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <div className="stat">82-0</div>
          <h3>NBA Season</h3>
          <p className="muted">
            Build a 6-man NBA roster from specific team seasons with 3 re-spins
            in casual mode.
          </p>
        </div>

        <div className="card">
          <div className="stat">17-0</div>
          <h3>NFL Season</h3>
          <p className="muted">
            Draft offense plus a Team Defense from a specific season with 6
            re-spins in casual mode.
          </p>
        </div>

        <div className="card">
          <div className="stat">162-0</div>
          <h3>MLB Season</h3>
          <p className="muted">
            Build a lineup, rotation, and bullpen from specific team seasons
            with 5 re-spins in casual mode.
          </p>
        </div>
      </section>
    </main>
  );
}
