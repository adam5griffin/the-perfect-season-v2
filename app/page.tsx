import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <main className="page home-page">
      <Nav />

      <header className="home-header">
        <div className="home-art-bg">
          <img
            src="/6CABEE02-7EE0-4F4C-A914-A01E08893205.png"
            alt="Perfect Season sports artwork"
            className="home-header-art"
          />
        </div>

        <div className="home-header-content">
          <div className="eyebrow">NBA • NFL • MLB</div>

          <h1>Can you build The Perfect Season?</h1>

          <p className="subtitle">
            Draw from the full team-season pool, choose players from exact
            rosters, and build the ultimate squad across basketball, football,
            and baseball.
          </p>

          <div className="buttons home-header-buttons">
            <Link className="btn" href="/play">
              Start Playing
            </Link>

            <Link className="btn secondary" href="/leaderboards">
              View Leaderboards
            </Link>
          </div>
        </div>
      </header>

      <section className="home-mode-grid">
        <Link className="home-mode-card" href="/play/nba">
          <span>🏀</span>
          <strong>NBA 82-0</strong>
          <p>Build a 6-man roster from exact team seasons.</p>
        </Link>

        <Link className="home-mode-card" href="/play/nfl">
          <span>🏈</span>
          <strong>NFL 17-0</strong>
          <p>Draft offense, defense, and chase an undefeated season.</p>
        </Link>

        <Link className="home-mode-card" href="/play/mlb">
          <span>⚾</span>
          <strong>MLB 162-0</strong>
          <p>Build a lineup, rotation, bullpen, and dominate the year.</p>
        </Link>
      </section>
    </main>
  );
}
