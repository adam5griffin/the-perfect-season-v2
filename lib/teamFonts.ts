export type TeamFont = {
  fontFamily: string;
  letterSpacing: string;
  textTransform: 'none' | 'uppercase';
  fontStyle?: 'normal' | 'italic';
};

const classicBlock: TeamFont = {
  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  letterSpacing: '-1px',
  textTransform: 'uppercase',
};

const luxurySerif: TeamFont = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  letterSpacing: '-1px',
  textTransform: 'none',
};

const modernBold: TeamFont = {
  fontFamily: "'Arial Black', Impact, Arial, sans-serif",
  letterSpacing: '-1.5px',
  textTransform: 'uppercase',
};

const cleanSport: TeamFont = {
  fontFamily: "'Trebuchet MS', Arial, sans-serif",
  letterSpacing: '-0.5px',
  textTransform: 'none',
};

const italicSport: TeamFont = {
  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  letterSpacing: '-1px',
  textTransform: 'uppercase',
  fontStyle: 'italic',
};

export const teamFonts: Record<string, TeamFont> = {
  // NBA
  'Atlanta Hawks': modernBold,
  'Boston Celtics': luxurySerif,
  'Brooklyn Nets': modernBold,
  'Charlotte Hornets': cleanSport,
  'Chicago Bulls': classicBlock,
  'Cleveland Cavaliers': luxurySerif,
  'Dallas Mavericks': modernBold,
  'Denver Nuggets': classicBlock,
  'Detroit Pistons': classicBlock,
  'Golden State Warriors': luxurySerif,
  'Houston Rockets': modernBold,
  'Indiana Pacers': cleanSport,
  'Los Angeles Clippers': modernBold,
  'LA Clippers': modernBold,
  'Los Angeles Lakers': luxurySerif,
  'Memphis Grizzlies': cleanSport,
  'Miami Heat': italicSport,
  'Milwaukee Bucks': classicBlock,
  'Minnesota Timberwolves': modernBold,
  'New Orleans Pelicans': luxurySerif,
  'New York Knicks': classicBlock,
  'Oklahoma City Thunder': modernBold,
  'Orlando Magic': modernBold,
  'Philadelphia 76ers': classicBlock,
  'Phoenix Suns': modernBold,
  'Portland Trail Blazers': italicSport,
  'Sacramento Kings': luxurySerif,
  'San Antonio Spurs': modernBold,
  'Toronto Raptors': modernBold,
  'Utah Jazz': classicBlock,
  'Washington Wizards': luxurySerif,

  // NFL
  'Arizona Cardinals': classicBlock,
  'Atlanta Falcons': italicSport,
  'Baltimore Ravens': luxurySerif,
  'Buffalo Bills': classicBlock,
  'Carolina Panthers': modernBold,
  'Chicago Bears': classicBlock,
  'Cincinnati Bengals': modernBold,
  'Cleveland Browns': classicBlock,
  'Dallas Cowboys': luxurySerif,
  'Denver Broncos': italicSport,
  'Detroit Lions': classicBlock,
  'Green Bay Packers': classicBlock,
  'Houston Texans': classicBlock,
  'Indianapolis Colts': luxurySerif,
  'Jacksonville Jaguars': modernBold,
  'Kansas City Chiefs': classicBlock,
  'Las Vegas Raiders': classicBlock,
  'Oakland Raiders': classicBlock,
  'Los Angeles Chargers': italicSport,
  'Los Angeles Rams': modernBold,
  'Miami Dolphins': italicSport,
  'Minnesota Vikings': classicBlock,
  'New England Patriots': modernBold,
  'New Orleans Saints': luxurySerif,
  'New York Giants': classicBlock,
  'New York Jets': classicBlock,
  'Philadelphia Eagles': modernBold,
  'Pittsburgh Steelers': classicBlock,
  'San Francisco 49ers': luxurySerif,
  'Seattle Seahawks': modernBold,
  'Tampa Bay Buccaneers': modernBold,
  'Tennessee Titans': classicBlock,
  'Washington Commanders': classicBlock,

  // MLB
  'Arizona Diamondbacks': modernBold,
  'Atlanta Braves': italicSport,
  'Baltimore Orioles': italicSport,
  'Boston Red Sox': classicBlock,
  'Chicago Cubs': classicBlock,
  'Chicago White Sox': classicBlock,
  'Cincinnati Reds': classicBlock,
  'Cleveland Guardians': classicBlock,
  'Cleveland Indians': classicBlock,
  'Colorado Rockies': luxurySerif,
  'Detroit Tigers': luxurySerif,
  'Houston Astros': modernBold,
  'Kansas City Royals': luxurySerif,
  'Los Angeles Angels': classicBlock,
  'Los Angeles Dodgers': italicSport,
  'Miami Marlins': modernBold,
  'Milwaukee Brewers': classicBlock,
  'Minnesota Twins': classicBlock,
  'New York Mets': classicBlock,
  'New York Yankees': luxurySerif,
  'Oakland Athletics': classicBlock,
  'Athletics': classicBlock,
  'Philadelphia Phillies': classicBlock,
  'Pittsburgh Pirates': classicBlock,
  'San Diego Padres': modernBold,
  'San Francisco Giants': luxurySerif,
  'Seattle Mariners': modernBold,
  'St. Louis Cardinals': luxurySerif,
  'Tampa Bay Rays': modernBold,
  'Texas Rangers': classicBlock,
  'Toronto Blue Jays': modernBold,
  'Washington Nationals': luxurySerif,
};

export function getTeamFont(teamName: string): TeamFont {
  return teamFonts[teamName] || classicBlock;
}
