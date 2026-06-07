export type SportKey = 'nba' | 'nfl' | 'mlb';

export type Player = {
  name: string;
  position: string;
  stats?: Record<string, number | string>;
};

export type SeasonTeam = {
  id: string;
  sport: SportKey;
  year: number;
  team: string;
  displayName: string;
  players: Player[];
};

export const sports = {
  nba: {
    name: 'NBA',
    perfectRecord: '82-0',
    reSpins: 3,
    roster: ['PG', 'SG', 'SF', 'PF', 'C', '6th Man'],
  },

  nfl: {
    name: 'NFL',
    perfectRecord: '17-0',
    reSpins: 6,
    roster: [
      'QB',
      'RB',
      'WR1',
      'WR2',
      'TE',
      'FLEX',
      'Offensive Line',
      'Team Defense',
    ],
  },

  mlb: {
    name: 'MLB',
    perfectRecord: '162-0',
    reSpins: 5,
    roster: [
      'C',
      '1B',
      '2B',
      '3B',
      'SS',
      'LF',
      'CF',
      'RF',
      'DH',
      'SP1',
      'SP2',
      'SP3',
      'SP4',
      'SP5',
      'Bullpen',
    ],
  },
} as const;

const YEARS_2000_TO_2026 = Array.from(
  { length: 2026 - 2000 + 1 },
  (_, index) => 2000 + index
);

const nbaTeams = [
  'Atlanta Hawks',
  'Boston Celtics',
  'Brooklyn Nets',
  'Charlotte Hornets',
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Detroit Pistons',
  'Golden State Warriors',
  'Houston Rockets',
  'Indiana Pacers',
  'Los Angeles Clippers',
  'Los Angeles Lakers',
  'Memphis Grizzlies',
  'Miami Heat',
  'Milwaukee Bucks',
  'Minnesota Timberwolves',
  'New Orleans Pelicans',
  'New York Knicks',
  'Oklahoma City Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Phoenix Suns',
  'Portland Trail Blazers',
  'Sacramento Kings',
  'San Antonio Spurs',
  'Toronto Raptors',
  'Utah Jazz',
  'Washington Wizards',
];

const nflTeams = [
  'Arizona Cardinals',
  'Atlanta Falcons',
  'Baltimore Ravens',
  'Buffalo Bills',
  'Carolina Panthers',
  'Chicago Bears',
  'Cincinnati Bengals',
  'Cleveland Browns',
  'Dallas Cowboys',
  'Denver Broncos',
  'Detroit Lions',
  'Green Bay Packers',
  'Houston Texans',
  'Indianapolis Colts',
  'Jacksonville Jaguars',
  'Kansas City Chiefs',
  'Las Vegas Raiders',
  'Los Angeles Chargers',
  'Los Angeles Rams',
  'Miami Dolphins',
  'Minnesota Vikings',
  'New England Patriots',
  'New Orleans Saints',
  'New York Giants',
  'New York Jets',
  'Philadelphia Eagles',
  'Pittsburgh Steelers',
  'San Francisco 49ers',
  'Seattle Seahawks',
  'Tampa Bay Buccaneers',
  'Tennessee Titans',
  'Washington Commanders',
];

const mlbTeams = [
  'Arizona Diamondbacks',
  'Atlanta Braves',
  'Baltimore Orioles',
  'Boston Red Sox',
  'Chicago Cubs',
  'Chicago White Sox',
  'Cincinnati Reds',
  'Cleveland Guardians',
  'Colorado Rockies',
  'Detroit Tigers',
  'Houston Astros',
  'Kansas City Royals',
  'Los Angeles Angels',
  'Los Angeles Dodgers',
  'Miami Marlins',
  'Milwaukee Brewers',
  'Minnesota Twins',
  'New York Mets',
  'New York Yankees',
  'Oakland Athletics',
  'Philadelphia Phillies',
  'Pittsburgh Pirates',
  'San Diego Padres',
  'San Francisco Giants',
  'Seattle Mariners',
  'St. Louis Cardinals',
  'Tampa Bay Rays',
  'Texas Rangers',
  'Toronto Blue Jays',
  'Washington Nationals',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function createPlaceholderPlayers(
  sport: SportKey,
  team: string,
  year: number
): Player[] {
  if (sport === 'nba') {
    return [
      {
        name: `${year} ${team} Point Guard`,
        position: 'PG',
      },
      {
        name: `${year} ${team} Shooting Guard`,
        position: 'SG',
      },
      {
        name: `${year} ${team} Small Forward`,
        position: 'SF',
      },
      {
        name: `${year} ${team} Power Forward`,
        position: 'PF',
      },
      {
        name: `${year} ${team} Center`,
        position: 'C',
      },
      {
        name: `${year} ${team} Sixth Man`,
        position: '6th Man',
      },
    ];
  }

  if (sport === 'nfl') {
    return [
      {
        name: `${year} ${team} Quarterback`,
        position: 'QB',
      },
      {
        name: `${year} ${team} Running Back`,
        position: 'RB',
      },
      {
        name: `${year} ${team} Wide Receiver 1`,
        position: 'WR',
      },
      {
        name: `${year} ${team} Wide Receiver 2`,
        position: 'WR',
      },
      {
        name: `${year} ${team} Tight End`,
        position: 'TE',
      },
      {
        name: `${year} ${team} Offensive Line`,
        position: 'OL',
      },
      {
        name: `${year} ${team} Team Defense`,
        position: 'DEF',
      },
    ];
  }

  return [
    {
      name: `${year} ${team} Catcher`,
      position: 'C',
    },
    {
      name: `${year} ${team} First Baseman`,
      position: '1B',
    },
    {
      name: `${year} ${team} Second Baseman`,
      position: '2B',
    },
    {
      name: `${year} ${team} Third Baseman`,
      position: '3B',
    },
    {
      name: `${year} ${team} Shortstop`,
      position: 'SS',
    },
    {
      name: `${year} ${team} Left Fielder`,
      position: 'LF',
    },
    {
      name: `${year} ${team} Center Fielder`,
      position: 'CF',
    },
    {
      name: `${year} ${team} Right Fielder`,
      position: 'RF',
    },
    {
      name: `${year} ${team} Designated Hitter`,
      position: 'DH',
    },
    {
      name: `${year} ${team} Starting Pitcher 1`,
      position: 'SP',
    },
    {
      name: `${year} ${team} Starting Pitcher 2`,
      position: 'SP',
    },
    {
      name: `${year} ${team} Starting Pitcher 3`,
      position: 'SP',
    },
    {
      name: `${year} ${team} Starting Pitcher 4`,
      position: 'SP',
    },
    {
      name: `${year} ${team} Starting Pitcher 5`,
      position: 'SP',
    },
    {
      name: `${year} ${team} Bullpen`,
      position: 'Bullpen',
    },
  ];
}

function generateLeagueSeasons(
  sport: SportKey,
  teams: string[]
): SeasonTeam[] {
  return teams.flatMap((team) =>
    YEARS_2000_TO_2026.map((year) => ({
      id: `${sport}-${year}-${slugify(team)}`,
      sport,
      year,
      team,
      displayName: `${year} ${team}`,
      players: createPlaceholderPlayers(sport, team, year),
    }))
  );
}

export const seasonDatabase: SeasonTeam[] = [
  ...generateLeagueSeasons('nba', nbaTeams),
  ...generateLeagueSeasons('nfl', nflTeams),
  ...generateLeagueSeasons('mlb', mlbTeams),
];

export function getSeasonsBySport(sport: SportKey): SeasonTeam[] {
  return seasonDatabase.filter((season) => season.sport === sport);
}

export function getRandomSeason(sport: SportKey): SeasonTeam {
  const seasons = getSeasonsBySport(sport);

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getRandomSeasonByTeam(
  sport: SportKey,
  team: string
): SeasonTeam {
  const seasons = seasonDatabase.filter(
    (season) => season.sport === sport && season.team === team
  );

  if (seasons.length === 0) {
    return getRandomSeason(sport);
  }

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getSeasonCountBySport(sport: SportKey): number {
  return getSeasonsBySport(sport).length;
}
