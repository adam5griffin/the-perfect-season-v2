import { Player, SportKey } from '../lib/gameData';

type PlayerCardProps = {
  player: Player;
  sportKey: SportKey;
  alreadySelected: boolean;
  beingSelected: boolean;
  isShuffling: boolean;
  cursorClass: string;
  onSelect: () => void;
};

function getPlayerTier(rating: number) {
  if (rating >= 95) return 'Legend';
  if (rating >= 90) return 'Elite';
  if (rating >= 85) return 'Star';
  if (rating >= 78) return 'Starter';
  return 'Role Player';
}

function getTierClass(rating: number) {
  if (rating >= 95) return 'tier-legend';
  if (rating >= 90) return 'tier-elite';
  if (rating >= 85) return 'tier-star';
  if (rating >= 78) return 'tier-starter';
  return 'tier-role';
}

function getSportStatLabels(sportKey: SportKey, stats?: Record<string, string | number>) {
  if (!stats) return [];

  const entries = Object.entries(stats);

  const preferredOrder =
    sportKey === 'nba'
      ? ['ppg', 'rpg', 'apg', 'spg', 'bpg', 'fg', 'threePt', 'ft']
      : sportKey === 'nfl'
      ? [
          'passYds',
          'passTd',
          'rushYds',
          'rushTd',
          'rec',
          'recYds',
          'recTd',
          'sacks',
          'int',
          'tackles',
        ]
      : ['avg', 'hr', 'rbi', 'sb', 'ops', 'era', 'wins', 'so', 'whip', 'saves'];

  const ordered = preferredOrder
    .filter((key) => stats[key] !== undefined)
    .map((key) => [key, stats[key]] as [string, string | number]);

  const leftovers = entries.filter(([key]) => !preferredOrder.includes(key));

  return [...ordered, ...leftovers].slice(0, 5);
}

function formatStatLabel(key: string) {
  const labels: Record<string, string> = {
    ppg: 'PPG',
    rpg: 'RPG',
    apg: 'APG',
    spg: 'SPG',
    bpg: 'BPG',
    fg: 'FG%',
    threePt: '3P%',
    ft: 'FT%',

    passYds: 'PASS YDS',
    passTd: 'PASS TD',
    rushYds: 'RUSH YDS',
    rushTd: 'RUSH TD',
    rec: 'REC',
    recYds: 'REC YDS',
    recTd: 'REC TD',
    sacks: 'SACKS',
    int: 'INT',
    tackles: 'TACKLES',

    avg: 'AVG',
    hr: 'HR',
    rbi: 'RBI',
    sb: 'SB',
    ops: 'OPS',
    era: 'ERA',
    wins: 'W',
    so: 'SO',
    whip: 'WHIP',
    saves: 'SV',
  };

  return labels[key] || key.toUpperCase();
}

export default function PlayerCard({
  player,
  sportKey,
  alreadySelected,
  beingSelected,
  isShuffling,
  cursorClass,
  onSelect,
}: PlayerCardProps) {
  const tier = getPlayerTier(player.rating);
  const tierClass = getTierClass(player.rating);
  const statEntries = getSportStatLabels(sportKey, player.stats);
  const ratingPercent = Math.min(100, Math.max(0, player.rating));

  return (
    <button
      className={`player-stat-card ${cursorClass} ${tierClass} ${
        beingSelected ? 'player-option-selected' : ''
      }`}
      onClick={onSelect}
      disabled={alreadySelected || beingSelected || isShuffling}
      style={{
        cursor: alreadySelected || beingSelected || isShuffling ? 'not-allowed' : undefined,
        opacity: alreadySelected ? 0.5 : 1,
      }}
    >
      <div className="player-card-top">
        <div>
          <strong>{player.name}</strong>
          <p>
            {player.position} • Rating {player.rating}
          </p>
        </div>

        <span className="player-tier-badge">{tier}</span>
      </div>

      <div className="player-rating-bar">
        <span style={{ width: `${ratingPercent}%` }} />
      </div>

      {statEntries.length > 0 ? (
        <div className="player-stat-grid">
          {statEntries.map(([key, value]) => (
            <div key={key}>
              <span>{formatStatLabel(key)}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      ) : (
        <p className="player-no-stats">Stats coming soon</p>
      )}

      {beingSelected && <p className="player-card-note">Adding to roster...</p>}
      {alreadySelected && <p className="player-card-note">Already selected</p>}
    </button>
  );
}
