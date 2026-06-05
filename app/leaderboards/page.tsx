import Nav from '../../components/Nav';

const rows = [
  ['1', 'AdamG', 'NBA Ultimate', '82-0'],
  ['2', 'PerfectMJ', 'NFL Ultimate', '17-0'],
  ['3', 'DiamondKing', 'MLB Ultimate', '160-2'],
];

export default function Leaderboards() {
  return (
    <main className="page">
      <Nav />
      <section className="section">
        <h1>Ultimate Leaderboards</h1>
        <p className="subtitle">No re-spins. No boosts. Just the best teams built by users.</p>
        <div className="card">
          <table>
            <thead>
              <tr><th>Rank</th><th>User</th><th>Category</th><th>Record</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.join('-')}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
