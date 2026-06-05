import Nav from '../../components/Nav';

export default function Pricing() {
  return (
    <main className="page">
      <Nav />
      <section className="section">
        <h1>Phase 2: Championship League</h1>
        <p className="subtitle">The launch version is free regular-season gameplay. The paid model unlocks playoffs and championship rounds.</p>
      </section>
      <section className="grid">
        <div className="card">
          <span className="pill">Free</span>
          <h2>Regular Season</h2>
          <p className="muted">NBA 82 games, NFL 17 games, MLB 162 games, casual mode, ultimate mode, leaderboards.</p>
        </div>
        <div className="card">
          <span className="pill">Pro</span>
          <h2>Championship League</h2>
          <p className="muted">NBA Playoffs, NFL Playoffs/Super Bowl, MLB Postseason/World Series, saved teams, premium badges.</p>
        </div>
        <div className="card">
          <span className="pill">Future</span>
          <h2>Dynasty Mode</h2>
          <p className="muted">Run multiple seasons and build a Hall of Fame legacy.</p>
        </div>
      </section>
    </main>
  );
}
