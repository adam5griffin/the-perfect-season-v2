import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <main className="page br-home">
      <Nav />

      <section className="br-hero">
        <div className="br-kicker">NBA • NFL • MLB</div>

        <h1 className="br-title">
          BUILD THE
          <span> PERFECT </span>
          SEASON
        </h1>

        <p className="br-subtitle">
          Draw from the full team-season pool. Pick one player from each exact
          roster. Build your squad and chase 82-0, 17-0, or 162-0.
        </p>

        <div className="br-actions">
          <Link className="br-primary" href="/play">
            START PLAYING
          </Link>

          <Link className="br-secondary" href="/leaderboards">
            LEADERBOARDS
          </Link>
        </div>

        <div className="br-art-frame">
          <img
            src="/6CABEE02-7EE0-4F4C-A914-A01E08893205.png"
            alt="Perfect Season sports artwork"
            className="br-art"
          />
        </div>
      </section>

      <section className="br-score-strip">
        <Link href="/play/nba" className="br-score-card">
          <span>NBA</span>
          <strong>82-0</strong>
          <p>Build a 6-man roster</p>
        </Link>

        <Link href="/play/nfl" className="br-score-card">
          <span>NFL</span>
          <strong>17-0</strong>
          <p>Draft offense + defense</p>
        </Link>

        <Link href="/play/mlb" className="br-score-card">
          <span>MLB</span>
          <strong>162-0</strong>
          <p>Lineup, rotation, bullpen</p>
        </Link>
      </section>

      <section className="br-feature-grid">
        <div className="br-feature-card green">
          <span>01</span>
          <h3>FULL RANDOM POOL</h3>
          <p>
            No easy filters. Every team-season is in play, making each draft
            unpredictable.
          </p>
        </div>

        <div className="br-feature-card purple">
          <span>02</span>
          <h3>EXACT ROSTERS</h3>
          <p>
            Choose players from specific team seasons like 2001 Lakers or 2019
            Chiefs.
          </p>
        </div>

        <div className="br-feature-card orange">
          <span>03</span>
          <h3>ULTIMATE MODE</h3>
          <p>
            No re-spins. Every draw is final. Build the best team with what you
            get.
          </p>
        </div>
      </section>
    </main>
  );
}
