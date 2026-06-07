export type SportKey = 'nba' | 'nfl' | 'mlb';

export type RosterBranch = 'championship' | 'legendary';

export type Player = {
  name: string;
  position: string;
  rating: number;
  stats?: Record<string, number | string>;
};

export type SeasonTeam = {
  id: string;
  sport: SportKey;
  year: number;
  team: string;
  displayName: string;
  isFeatured?: boolean;
  rosterBranch?: RosterBranch;
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

function placeholderRating(year: number, team: string, position: string) {
  const seed =
    year +
    team.length * 3 +
    position.split('').reduce((sum, letter) => sum + letter.charCodeAt(0), 0);

  return 70 + (seed % 18);
}

function createPlayer(
  name: string,
  position: string,
  rating: number,
  stats?: Record<string, number | string>
): Player {
  return {
    name,
    position,
    rating,
    stats,
  };
}

function createPlaceholderPlayers(
  sport: SportKey,
  team: string,
  year: number
): Player[] {
  if (sport === 'nba') {
    return [
      createPlayer(`${year} ${team} Point Guard`, 'PG', placeholderRating(year, team, 'PG')),
      createPlayer(`${year} ${team} Shooting Guard`, 'SG', placeholderRating(year, team, 'SG')),
      createPlayer(`${year} ${team} Small Forward`, 'SF', placeholderRating(year, team, 'SF')),
      createPlayer(`${year} ${team} Power Forward`, 'PF', placeholderRating(year, team, 'PF')),
      createPlayer(`${year} ${team} Center`, 'C', placeholderRating(year, team, 'C')),
      createPlayer(`${year} ${team} Sixth Man`, '6th Man', placeholderRating(year, team, '6th Man')),
    ];
  }

  if (sport === 'nfl') {
    return [
      createPlayer(`${year} ${team} Quarterback`, 'QB', placeholderRating(year, team, 'QB')),
      createPlayer(`${year} ${team} Running Back`, 'RB', placeholderRating(year, team, 'RB')),
      createPlayer(`${year} ${team} Wide Receiver 1`, 'WR', placeholderRating(year, team, 'WR1')),
      createPlayer(`${year} ${team} Wide Receiver 2`, 'WR', placeholderRating(year, team, 'WR2')),
      createPlayer(`${year} ${team} Tight End`, 'TE', placeholderRating(year, team, 'TE')),
      createPlayer(`${year} ${team} Offensive Line`, 'OL', placeholderRating(year, team, 'OL')),
      createPlayer(`${year} ${team} Team Defense`, 'DEF', placeholderRating(year, team, 'DEF')),
    ];
  }

  return [
    createPlayer(`${year} ${team} Catcher`, 'C', placeholderRating(year, team, 'C')),
    createPlayer(`${year} ${team} First Baseman`, '1B', placeholderRating(year, team, '1B')),
    createPlayer(`${year} ${team} Second Baseman`, '2B', placeholderRating(year, team, '2B')),
    createPlayer(`${year} ${team} Third Baseman`, '3B', placeholderRating(year, team, '3B')),
    createPlayer(`${year} ${team} Shortstop`, 'SS', placeholderRating(year, team, 'SS')),
    createPlayer(`${year} ${team} Left Fielder`, 'LF', placeholderRating(year, team, 'LF')),
    createPlayer(`${year} ${team} Center Fielder`, 'CF', placeholderRating(year, team, 'CF')),
    createPlayer(`${year} ${team} Right Fielder`, 'RF', placeholderRating(year, team, 'RF')),
    createPlayer(`${year} ${team} Designated Hitter`, 'DH', placeholderRating(year, team, 'DH')),
    createPlayer(`${year} ${team} Starting Pitcher 1`, 'SP', placeholderRating(year, team, 'SP1')),
    createPlayer(`${year} ${team} Starting Pitcher 2`, 'SP', placeholderRating(year, team, 'SP2')),
    createPlayer(`${year} ${team} Starting Pitcher 3`, 'SP', placeholderRating(year, team, 'SP3')),
    createPlayer(`${year} ${team} Starting Pitcher 4`, 'SP', placeholderRating(year, team, 'SP4')),
    createPlayer(`${year} ${team} Starting Pitcher 5`, 'SP', placeholderRating(year, team, 'SP5')),
    createPlayer(`${year} ${team} Bullpen`, 'Bullpen', placeholderRating(year, team, 'Bullpen')),
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
      isFeatured: false,
      players: createPlaceholderPlayers(sport, team, year),
    }))
  );
}

const featuredSeasons: SeasonTeam[] = [
  // NBA — Championship Rosters
  {
    id: 'nba-2001-los-angeles-lakers-featured',
    sport: 'nba',
    year: 2001,
    team: 'Los Angeles Lakers',
    displayName: '2001 Los Angeles Lakers',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer("Shaquille O'Neal", 'C', 99, { ppg: 28.7, rpg: 12.7 }),
      createPlayer('Kobe Bryant', 'SG', 98, { ppg: 28.5, apg: 5.0 }),
      createPlayer('Derek Fisher', 'PG', 84),
      createPlayer('Rick Fox', 'SF', 82),
      createPlayer('Robert Horry', 'PF', 85),
      createPlayer('Brian Shaw', '6th Man', 80),
    ],
  },

  {
    id: 'nba-2017-golden-state-warriors-featured',
    sport: 'nba',
    year: 2017,
    team: 'Golden State Warriors',
    displayName: '2017 Golden State Warriors',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Stephen Curry', 'PG', 99),
      createPlayer('Klay Thompson', 'SG', 94),
      createPlayer('Kevin Durant', 'SF', 99),
      createPlayer('Draymond Green', 'PF', 93),
      createPlayer('Zaza Pachulia', 'C', 76),
      createPlayer('Andre Iguodala', '6th Man', 88),
    ],
  },

  {
    id: 'nba-2013-miami-heat-featured',
    sport: 'nba',
    year: 2013,
    team: 'Miami Heat',
    displayName: '2013 Miami Heat',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Mario Chalmers', 'PG', 83),
      createPlayer('Dwyane Wade', 'SG', 96),
      createPlayer('LeBron James', 'SF', 99),
      createPlayer('Chris Bosh', 'PF', 92),
      createPlayer('Chris Andersen', 'C', 82),
      createPlayer('Ray Allen', '6th Man', 88),
    ],
  },

  {
    id: 'nba-2016-cleveland-cavaliers-featured',
    sport: 'nba',
    year: 2016,
    team: 'Cleveland Cavaliers',
    displayName: '2016 Cleveland Cavaliers',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Kyrie Irving', 'PG', 95),
      createPlayer('J.R. Smith', 'SG', 84),
      createPlayer('LeBron James', 'SF', 99),
      createPlayer('Kevin Love', 'PF', 91),
      createPlayer('Tristan Thompson', 'C', 84),
      createPlayer('Richard Jefferson', '6th Man', 80),
    ],
  },

  // NBA — Legendary Rosters
  {
    id: 'nba-2008-boston-celtics-featured',
    sport: 'nba',
    year: 2008,
    team: 'Boston Celtics',
    displayName: '2008 Boston Celtics',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Rajon Rondo', 'PG', 88),
      createPlayer('Ray Allen', 'SG', 92),
      createPlayer('Paul Pierce', 'SF', 95),
      createPlayer('Kevin Garnett', 'PF', 97),
      createPlayer('Kendrick Perkins', 'C', 82),
      createPlayer('James Posey', '6th Man', 84),
    ],
  },

  {
    id: 'nba-2014-san-antonio-spurs-featured',
    sport: 'nba',
    year: 2014,
    team: 'San Antonio Spurs',
    displayName: '2014 San Antonio Spurs',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Tony Parker', 'PG', 92),
      createPlayer('Danny Green', 'SG', 86),
      createPlayer('Kawhi Leonard', 'SF', 93),
      createPlayer('Tim Duncan', 'PF', 94),
      createPlayer('Tiago Splitter', 'C', 83),
      createPlayer('Manu Ginobili', '6th Man', 90),
    ],
  },

  // NFL — Championship Rosters
  {
    id: 'nfl-2019-kansas-city-chiefs-featured',
    sport: 'nfl',
    year: 2019,
    team: 'Kansas City Chiefs',
    displayName: '2019 Kansas City Chiefs',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Patrick Mahomes', 'QB', 99),
      createPlayer('Damien Williams', 'RB', 84),
      createPlayer('Tyreek Hill', 'WR', 97),
      createPlayer('Sammy Watkins', 'WR', 84),
      createPlayer('Travis Kelce', 'TE', 98),
      createPlayer('2019 Chiefs Offensive Line', 'OL', 89),
      createPlayer('2019 Chiefs Team Defense', 'DEF', 84),
    ],
  },

  {
    id: 'nfl-2000-baltimore-ravens-featured',
    sport: 'nfl',
    year: 2000,
    team: 'Baltimore Ravens',
    displayName: '2000 Baltimore Ravens',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Trent Dilfer', 'QB', 80),
      createPlayer('Jamal Lewis', 'RB', 90),
      createPlayer('Qadry Ismail', 'WR', 82),
      createPlayer('Brandon Stokley', 'WR', 78),
      createPlayer('Shannon Sharpe', 'TE', 90),
      createPlayer('2000 Ravens Offensive Line', 'OL', 88),
      createPlayer('2000 Ravens Team Defense', 'DEF', 99),
    ],
  },

  // NFL — Legendary Rosters
  {
    id: 'nfl-2007-new-england-patriots-featured',
    sport: 'nfl',
    year: 2007,
    team: 'New England Patriots',
    displayName: '2007 New England Patriots',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Tom Brady', 'QB', 99),
      createPlayer('Laurence Maroney', 'RB', 83),
      createPlayer('Randy Moss', 'WR', 99),
      createPlayer('Wes Welker', 'WR', 92),
      createPlayer('Ben Watson', 'TE', 82),
      createPlayer('2007 Patriots Offensive Line', 'OL', 92),
      createPlayer('2007 Patriots Team Defense', 'DEF', 88),
    ],
  },

  {
    id: 'nfl-2013-seattle-seahawks-featured',
    sport: 'nfl',
    year: 2013,
    team: 'Seattle Seahawks',
    displayName: '2013 Seattle Seahawks',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Russell Wilson', 'QB', 92),
      createPlayer('Marshawn Lynch', 'RB', 97),
      createPlayer('Golden Tate', 'WR', 84),
      createPlayer('Doug Baldwin', 'WR', 85),
      createPlayer('Zach Miller', 'TE', 80),
      createPlayer('2013 Seahawks Offensive Line', 'OL', 86),
      createPlayer('2013 Seahawks Team Defense', 'DEF', 98),
    ],
  },

  // MLB — Championship Rosters
  {
    id: 'mlb-2025-los-angeles-dodgers-featured',
    sport: 'mlb',
    year: 2025,
    team: 'Los Angeles Dodgers',
    displayName: '2025 Los Angeles Dodgers',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Will Smith', 'C', 89),
      createPlayer('Freddie Freeman', '1B', 94),
      createPlayer('Mookie Betts', '2B', 96),
      createPlayer('Max Muncy', '3B', 84),
      createPlayer('Miguel Rojas', 'SS', 80),
      createPlayer('Teoscar Hernández', 'LF', 86),
      createPlayer('Andy Pages', 'CF', 79),
      createPlayer('Jason Heyward', 'RF', 78),
      createPlayer('Shohei Ohtani', 'DH', 99),
      createPlayer('Tyler Glasnow', 'SP', 91),
      createPlayer('Yoshinobu Yamamoto', 'SP', 90),
      createPlayer('Clayton Kershaw', 'SP', 88),
      createPlayer('Walker Buehler', 'SP', 87),
      createPlayer('Bobby Miller', 'SP', 82),
      createPlayer('2025 Dodgers Bullpen', 'Bullpen', 88),
    ],
  },

  {
    id: 'mlb-1998-new-york-yankees-featured',
    sport: 'mlb',
    year: 1998,
    team: 'New York Yankees',
    displayName: '1998 New York Yankees',
    isFeatured: true,
    rosterBranch: 'championship',
    players: [
      createPlayer('Jorge Posada', 'C', 87),
      createPlayer('Tino Martinez', '1B', 88),
      createPlayer('Chuck Knoblauch', '2B', 86),
      createPlayer('Scott Brosius', '3B', 84),
      createPlayer('Derek Jeter', 'SS', 96),
      createPlayer('Chad Curtis', 'LF', 80),
      createPlayer('Bernie Williams', 'CF', 94),
      createPlayer("Paul O'Neill", 'RF', 90),
      createPlayer('Darryl Strawberry', 'DH', 83),
      createPlayer('David Wells', 'SP', 90),
      createPlayer('Andy Pettitte', 'SP', 88),
      createPlayer('Orlando Hernández', 'SP', 86),
      createPlayer('David Cone', 'SP', 89),
      createPlayer('Hideki Irabu', 'SP', 79),
      createPlayer('1998 Yankees Bullpen', 'Bullpen', 96),
    ],
  },

  // MLB — Legendary Rosters
  {
    id: 'mlb-2001-seattle-mariners-featured',
    sport: 'mlb',
    year: 2001,
    team: 'Seattle Mariners',
    displayName: '2001 Seattle Mariners',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Dan Wilson', 'C', 82),
      createPlayer('John Olerud', '1B', 90),
      createPlayer('Bret Boone', '2B', 94),
      createPlayer('David Bell', '3B', 82),
      createPlayer('Carlos Guillen', 'SS', 83),
      createPlayer('Al Martin', 'LF', 78),
      createPlayer('Mike Cameron', 'CF', 90),
      createPlayer('Ichiro Suzuki', 'RF', 97),
      createPlayer('Edgar Martinez', 'DH', 96),
      createPlayer('Freddy Garcia', 'SP', 91),
      createPlayer('Jamie Moyer', 'SP', 88),
      createPlayer('Aaron Sele', 'SP', 86),
      createPlayer('Paul Abbott', 'SP', 82),
      createPlayer('John Halama', 'SP', 80),
      createPlayer('2001 Mariners Bullpen', 'Bullpen', 88),
    ],
  },

  {
    id: 'mlb-2016-chicago-cubs-featured',
    sport: 'mlb',
    year: 2016,
    team: 'Chicago Cubs',
    displayName: '2016 Chicago Cubs',
    isFeatured: true,
    rosterBranch: 'legendary',
    players: [
      createPlayer('Willson Contreras', 'C', 84),
      createPlayer('Anthony Rizzo', '1B', 94),
      createPlayer('Ben Zobrist', '2B', 88),
      createPlayer('Kris Bryant', '3B', 96),
      createPlayer('Addison Russell', 'SS', 84),
      createPlayer('Kyle Schwarber', 'LF', 83),
      createPlayer('Dexter Fowler', 'CF', 88),
      createPlayer('Jason Heyward', 'RF', 82),
      createPlayer('Jorge Soler', 'DH', 80),
      createPlayer('Jake Arrieta', 'SP', 92),
      createPlayer('Jon Lester', 'SP', 92),
      createPlayer('Kyle Hendricks', 'SP', 93),
      createPlayer('John Lackey', 'SP', 84),
      createPlayer('Jason Hammel', 'SP', 82),
      createPlayer('2016 Cubs Bullpen', 'Bullpen', 89),
    ],
  },
];

const generatedSeasons = [
  ...generateLeagueSeasons('nba', nbaTeams),
  ...generateLeagueSeasons('nfl', nflTeams),
  ...generateLeagueSeasons('mlb', mlbTeams),
];

const featuredIds = new Set(
  featuredSeasons.map((season) => `${season.sport}-${season.year}-${season.team}`)
);

export const seasonDatabase: SeasonTeam[] = [
  ...featuredSeasons,
  ...generatedSeasons.filter(
    (season) => !featuredIds.has(`${season.sport}-${season.year}-${season.team}`)
  ),
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

export function getFeaturedSeasonsBySport(sport: SportKey): SeasonTeam[] {
  return seasonDatabase.filter(
    (season) => season.sport === sport && season.isFeatured
  );
}

export function getFeaturedSeasonsBySportAndBranch(
  sport: SportKey,
  branch: RosterBranch
): SeasonTeam[] {
  return seasonDatabase.filter(
    (season) =>
      season.sport === sport &&
      season.isFeatured &&
      season.rosterBranch === branch
  );
}

export function getRandomFeaturedSeason(sport: SportKey): SeasonTeam {
  const seasons = getFeaturedSeasonsBySport(sport);

  if (seasons.length === 0) {
    return getRandomSeason(sport);
  }

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getRandomFeaturedSeasonByTeam(
  sport: SportKey,
  team: string
): SeasonTeam {
  const seasons = seasonDatabase.filter(
    (season) =>
      season.sport === sport &&
      season.team === team &&
      season.isFeatured
  );

  if (seasons.length === 0) {
    return getRandomFeaturedSeason(sport);
  }

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getRandomFeaturedSeasonByBranch(
  sport: SportKey,
  branch: RosterBranch
): SeasonTeam {
  const seasons = getFeaturedSeasonsBySportAndBranch(sport, branch);

  if (seasons.length === 0) {
    return getRandomFeaturedSeason(sport);
  }

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getRandomFeaturedSeasonByTeamAndBranch(
  sport: SportKey,
  team: string,
  branch: RosterBranch
): SeasonTeam {
  const seasons = seasonDatabase.filter(
    (season) =>
      season.sport === sport &&
      season.team === team &&
      season.isFeatured &&
      season.rosterBranch === branch
  );

  if (seasons.length === 0) {
    return getRandomFeaturedSeasonByBranch(sport, branch);
  }

  return seasons[Math.floor(Math.random() * seasons.length)];
}

export function getSeasonCountBySport(sport: SportKey): number {
  return getSeasonsBySport(sport).length;
}
