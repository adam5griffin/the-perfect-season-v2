export type TeamWordmark = {
  style: 'script' | 'serif' | 'block' | 'modern';
  shape?: 'arched' | 'italic' | 'normal';
};

const script: TeamWordmark = {
  style: 'script',
  shape: 'italic',
};

const serif: TeamWordmark = {
  style: 'serif',
  shape: 'arched',
};

const block: TeamWordmark = {
  style: 'block',
  shape: 'arched',
};

const modern: TeamWordmark = {
  style: 'modern',
  shape: 'italic',
};

export const teamWordmarks: Record<string, TeamWordmark> = {
  // NBA
  'Los Angeles Lakers': script,
  'Boston Celtics': serif,
  'Chicago Bulls': block,
  'Golden State Warriors': block,
  'Miami Heat': modern,
  'Dallas Mavericks': modern,
  'Sacramento Kings': modern,
  'Toronto Raptors': modern,
  'New York Knicks': block,
  'Cleveland Cavaliers': serif,
  'San Antonio Spurs': modern,
  'Phoenix Suns': modern,
  'Philadelphia 76ers': block,
  'Detroit Pistons': block,
  'Milwaukee Bucks': block,
  'Denver Nuggets': block,
  'Houston Rockets': modern,
  'Brooklyn Nets': modern,
  'Los Angeles Clippers': modern,
  'LA Clippers': modern,

  // NFL
  'Dallas Cowboys': serif,
  'Chicago Bears': block,
  'Green Bay Packers': block,
  'Philadelphia Eagles': modern,
  'San Francisco 49ers': serif,
  'Baltimore Ravens': serif,
  'Kansas City Chiefs': modern,
  'New England Patriots': modern,
  'Pittsburgh Steelers': block,
  'Las Vegas Raiders': block,
  'Oakland Raiders': block,
  'Denver Broncos': modern,
  'Miami Dolphins': modern,
  'Buffalo Bills': block,
  'New York Giants': block,
  'Seattle Seahawks': modern,

  // MLB
  'Los Angeles Dodgers': script,
  'New York Yankees': serif,
  'Boston Red Sox': block,
  'San Francisco Giants': serif,
  'Chicago Cubs': block,
  'Seattle Mariners': serif,
  'San Diego Padres': block,
  'Houston Astros': block,
  'Atlanta Braves': script,
  'Baltimore Orioles': script,
  'St. Louis Cardinals': script,
  'New York Mets': block,
  'Philadelphia Phillies': block,
  'Texas Rangers': block,
  'Toronto Blue Jays': modern,
};

export function getTeamWordmark(teamName: string): TeamWordmark {
  return teamWordmarks[teamName] || block;
}
