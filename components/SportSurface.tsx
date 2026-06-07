import { Player, SportKey } from '../lib/gameData';

type SportSurfaceProps = {
  sportKey: SportKey;
  roster: readonly string[];
  userRoster: Record<string, Player | null>;
};

function getSportLabel(sportKey: SportKey) {
  if (sportKey === 'nba') return 'Basketball Court';
  if (sportKey === 'nfl') return 'Football Field';
  return 'Baseball Diamond';
}

function getSurfaceClass(sportKey: SportKey) {
  if (sportKey === 'nba') return 'sport-surface nba-court';
  if (sportKey === 'nfl') return 'sport-surface nfl-field';
  return 'sport-surface mlb-diamond';
}

function getSlotClass(sportKey: SportKey, slot: string) {
  const cleanSlot = slot
    .toLowerCase()
    .replace(/\+/g, '')
    .replace(/\s+/g, '-');

  return `surface-slot ${sportKey}-${cleanSlot}`;
}

export default function SportSurface({
  sportKey,
  roster,
  userRoster,
}: SportSurfaceProps) {
  return (
    <div className="surface-card">
      <div className="surface-header">
        <div>
          <p className="eyebrow">{getSportLabel(sportKey)}</p>
          <h2>Visual Lineup</h2>
        </div>

        <p className="small">
          Players fill into their position after you draft them.
        </p>
      </div>

      <div className={getSurfaceClass(sportKey)}>
        <div className="surface-glow" />

        {sportKey === 'nba' && (
          <>
            <div className="court-center-circle" />
            <div className="court-key-left" />
            <div className="court-key-right" />
            <div className="court-line court-midline" />
          </>
        )}

        {sportKey === 'nfl' && (
          <>
            <div className="yard-line yard-20" />
            <div className="yard-line yard-40" />
            <div className="yard-line yard-50" />
            <div className="yard-line yard-60" />
            <div className="yard-line yard-80" />
          </>
        )}

        {sportKey === 'mlb' && (
          <>
            <div className="diamond-infield" />
            <div className="base base-home" />
            <div className="base base-first" />
            <div className="base base-second" />
            <div className="base base-third" />
            <div className="pitcher-mound" />
          </>
        )}

        {roster.map((slot) => {
          const player = userRoster[slot];
          const filled = Boolean(player);

          return (
            <div
              key={slot}
              className={`${getSlotClass(sportKey, slot)} ${
                filled ? 'filled' : 'empty'
              }`}
            >
              <span className="surface-slot-label">{slot}</span>

              {player ? (
                <>
                  <strong>{player.name}</strong>
                  <span className="surface-rating">Rating {player.rating}</span>
                </>
              ) : (
                <span className="surface-empty">Open Spot</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
