import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="brand">THE PERFECT SEASON</Link>
      <div className="navlinks">
        <Link href="/play">Play</Link>
        <Link href="/leaderboards">Leaderboards</Link>
        <Link href="/pricing">Pricing</Link>
        <span>Sign In</span>
      </div>
    </nav>
  );
}
