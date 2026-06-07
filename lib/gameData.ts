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

export const seasonDatabase: SeasonTeam[] = [
  {
    id: 'nba-1996-chicago-bulls',
    sport: 'nba',
    year: 1996,
    team: 'Chicago Bulls',
    displayName: '1996 Chicago Bulls',
    players: [
      {
        name: 'Michael Jordan',
        position: 'SG',
        stats: { ppg: 30.4, rpg: 6.6, apg: 4.3 },
      },
      {
        name: 'Scottie Pippen',
        position: 'SF',
        stats: { ppg: 19.4, rpg: 6.4, apg: 5.9 },
      },
      {
        name: 'Dennis Rodman',
        position: 'PF',
        stats: { rpg: 14.9 },
      },
    ],
  },

  {
    id: 'nba-2001-los-angeles-lakers',
    sport: 'nba',
    year: 2001,
    team: 'Los Angeles Lakers',
    displayName: '2001 Los Angeles Lakers',
    players: [
      {
        name: "Shaquille O'Neal",
        position: 'C',
        stats: { ppg: 28.7, rpg: 12.7, apg: 3.7 },
      },
      {
        name: 'Kobe Bryant',
        position: 'SG',
        stats: { ppg: 28.5, rpg: 5.9, apg: 5.0 },
      },
      {
        name: 'Derek Fisher',
        position: 'PG',
      },
    ],
  },

  {
    id: 'nfl-1993-dallas-cowboys',
    sport: 'nfl',
    year: 1993,
    team: 'Dallas Cowboys',
    displayName: '1993 Dallas Cowboys',
    players: [
      {
        name: 'Troy Aikman',
        position: 'QB',
      },
      {
        name: 'Emmitt Smith',
        position: 'RB',
      },
      {
        name: 'Michael Irvin',
        position: 'WR',
      },
      {
        name: '1993 Cowboys Offensive Line',
        position: 'OL',
      },
      {
        name: '1993 Cowboys Team Defense',
        position: 'DEF',
      },
    ],
  },

  {
    id: 'nfl-2000-baltimore-ravens',
    sport: 'nfl',
    year: 2000,
    team: 'Baltimore Ravens',
    displayName: '2000 Baltimore Ravens',
    players: [
      {
        name: 'Jamal Lewis',
        position: 'RB',
      },
      {
        name: 'Shannon Sharpe',
        position: 'TE',
      },
      {
        name: '2000 Ravens Team Defense',
        position: 'DEF',
        stats: { pointsAllowed: 165, takeaways: 49 },
      },
    ],
  },

  {
    id: 'mlb-1998-new-york-yankees',
    sport: 'mlb',
    year: 1998,
    team: 'New York Yankees',
    displayName: '1998 New York Yankees',
    players: [
      {
        name: 'Derek Jeter',
        position: 'SS',
      },
      {
        name: 'Bernie Williams',
        position: 'CF',
      },
      {
        name: 'Mariano Rivera',
        position: 'RP',
      },
      {
        name: '1998 Yankees Bullpen',
        position: 'Bullpen',
      },
    ],
  },

  {
    id: 'mlb-2025-los-angeles-dodgers',
    sport: 'mlb',
    year: 2025,
    team: 'Los Angeles Dodgers',
    displayName: '2025 Los Angeles Dodgers',
    players: [
      {
        name: 'Shohei Ohtani',
        position: 'DH',
      },
      {
        name: 'Mookie Betts',
        position: 'RF',
      },
      {
        name: 'Freddie Freeman',
        position: '1B',
      },
      {
        name: '2025 Dodgers Bullpen',
        position: 'Bullpen',
      },
    ],
  },
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
