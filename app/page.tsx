import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <main className="page premium-home">
      <Nav />

      <section className="premium-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="premium-hero-content">
          <div className="eyebrow">NBA • NFL • MLB</div>

          <h1>Can you build The Perfect Season?</h1>

          <p className="subtitle premium-subtitle">
            Draw from the full team-season pool, choose players from exact
            rosters, and build the ultimate squad across basketball, football,
            and baseball.
          </p>

          <div className="buttons premium-buttons">
            <Link className="btn" href="/play">
              Start Playing
            </Link>

            <Link className="btn secondary" href="/leaderboards">
              View Leaderboards
            </Link>
          </div>

          <div className="hero-mini-stats">
            <div>
              <strong>82-0</strong>
              <span>NBA Goal</span>
            </div>

            <div>
              <strong>17-0</strong>
              <span>NFL Goal</span>
            </div>

            <div>
              <strong>162-0</strong>
              <span>MLB Goal</span>
            </div>
          </div>
        </div>

        <div className="premium-art-stage">
          <div className="art-backdrop" />
          <img
            src="/6CABEE02-7EE0-4F4C-A914-A01E08893205.png"
            alt="Perfect Season sports artwork"
            className="premium-hero-art"
          />
        </div>
      </section>

      <section className="premium-grid">
        <Link className="premium-card" href="/play/nba">
          <div className="premium-icon">🏀</div>
          <div>
            <h3>NBA Season</h3>
            <p>
              Build a 6-man roster from exact team seasons and chase the
              impossible 82-0 record.
            </p>
          </div>
        </Link>

        <Link className="premium-card" href="/play/nfl">
          <div className="premium-icon">🏈</div>
          <div>
            <h3>NFL Season</h3>
            <p>
              Draft offense, add a team defense, and try to finish the year
              undefeated.
            </p>
          </div>
        </Link>

        <Link className="premium-card" href="/play/mlb">
          <div className="premium-icon">⚾</div>
          <div>
            <h3>MLB Season</h3>
            <p>
              Build a lineup, rotation, and bullpen powerful enough to dominate
              a 162-game season.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
