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
  'Atlanta Hawks': modern,
  'Boston Celtics': serif,
  'Brooklyn Nets': modern,
  'Charlotte Hornets': modern,
  'Chicago Bulls': block,
  'Cleveland Cavaliers': serif,
  'Dallas Mavericks': modern,
  'Denver Nuggets': block,
  'Detroit Pistons': block,
  'Golden State Warriors': block,
  'Houston Rockets': modern,
  'Indiana Pacers': block,
  'Los Angeles Clippers': modern,
  'LA Clippers': modern,
  'Los Angeles Lakers': script,
  'Memphis Grizzlies': modern,
  'Miami Heat': modern,
  'Milwaukee Bucks': block,
  'Minnesota Timberwolves': modern,
  'New Orleans Pelicans': serif,
  'New York Knicks': block,
  'Oklahoma City Thunder': modern,
  'Orlando Magic': modern,
  'Philadelphia 76ers': block,
  'Phoenix Suns': modern,
  'Portland Trail Blazers': modern,
  'Sacramento Kings': modern,
  'San Antonio Spurs': modern,
  'Toronto Raptors': modern,
  'Utah Jazz': block,
  'Washington Wizards': serif,

  // NFL
  'Arizona Cardinals': block,
  'Atlanta Falcons': modern,
  'Baltimore Ravens': serif,
  'Buffalo Bills': block,
  'Carolina Panthers': modern,
  'Chicago Bears': block,
  'Cincinnati Bengals': modern,
  'Cleveland Browns': block,
  'Dallas Cowboys': serif,
  'Denver Broncos': modern,
  'Detroit Lions': block,
  'Green Bay Packers': block,
  'Houston Texans': block,
  'Indianapolis Colts': serif,
  'Jacksonville Jaguars': modern,
  'Kansas City Chiefs': modern,
  'Las Vegas Raiders': block,
  'Oakland Raiders': block,
  'Los Angeles Chargers': modern,
  'Los Angeles Rams': modern,
  'Miami Dolphins': modern,
  'Minnesota Vikings': block,
  'New England Patriots': modern,
  'New Orleans Saints': serif,
  'New York Giants': block,
  'New York Jets': block,
  'Philadelphia Eagles': modern,
  'Pittsburgh Steelers': block,
  'San Francisco 49ers': serif,
  'Seattle Seahawks': modern,
  'Tampa Bay Buccaneers': modern,
  'Tennessee Titans': block,
  'Washington Commanders': block,

  // MLB
  'Arizona Diamondbacks': modern,
  'Atlanta Braves': script,
  'Baltimore Orioles': script,
  'Boston Red Sox': block,
  'Chicago Cubs': block,
  'Chicago White Sox': block,
  'Cincinnati Reds': block,
  'Cleveland Guardians': block,
  'Cleveland Indians': block,
  'Colorado Rockies': serif,
  'Detroit Tigers': serif,
  'Houston Astros': block,
  'Kansas City Royals': serif,
  'Los Angeles Angels': block,
  'Los Angeles Dodgers': script,
  'Miami Marlins': modern,
  'Milwaukee Brewers': block,
  'Minnesota Twins': block,
  'New York Mets': block,
  'New York Yankees': serif,
  'Oakland Athletics': block,
  'Athletics': block,
  'Philadelphia Phillies': block,
  'Pittsburgh Pirates': block,
  'San Diego Padres': block,
  'San Francisco Giants': serif,
  'Seattle Mariners': serif,
  'St. Louis Cardinals': script,
  'Tampa Bay Rays': modern,
  'Texas Rangers': block,
  'Toronto Blue Jays': modern,
  'Washington Nationals': serif,
};

export function getTeamWordmark(teamName: string): TeamWordmark {
  return teamWordmarks[teamName] || block;
}
