export type TeamColor = {
  primary: string;
  secondary: string;
  accent: string;
  alternate: string;
  text: string;
};

export const teamColors: Record<string, TeamColor> = {
  // NBA — ATLANTIC
  'Boston Celtics': {
    primary: '#007A33',
    secondary: '#BA9653',
    accent: '#963821',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Brooklyn Nets': {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#777D84',
    alternate: '#111111',
    text: '#FFFFFF',
  },

  'New York Knicks': {
    primary: '#006BB6',
    secondary: '#F58426',
    accent: '#BEC0C2',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Philadelphia 76ers': {
    primary: '#006BB6',
    secondary: '#ED174C',
    accent: '#002B5C',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Toronto Raptors': {
    primary: '#CE1141',
    secondary: '#000000',
    accent: '#A1A1A4',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  // NBA — CENTRAL
  'Chicago Bulls': {
    primary: '#CE1141',
    secondary: '#000000',
    accent: '#FFFFFF',
    alternate: '#C4CED4',
    text: '#FFFFFF',
  },

  'Cleveland Cavaliers': {
    primary: '#860038',
    secondary: '#FDBB30',
    accent: '#041E42',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'Detroit Pistons': {
    primary: '#C8102E',
    secondary: '#1D42BA',
    accent: '#BEC0C2',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Indiana Pacers': {
    primary: '#002D62',
    secondary: '#FDBB30',
    accent: '#BEC0C2',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Milwaukee Bucks': {
    primary: '#00471B',
    secondary: '#EEE1C6',
    accent: '#0077C0',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  // NBA — SOUTHEAST
  'Atlanta Hawks': {
    primary: '#E03A3E',
    secondary: '#C1D32F',
    accent: '#26282A',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Charlotte Hornets': {
    primary: '#1D1160',
    secondary: '#00788C',
    accent: '#A1A1A4',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Miami Heat': {
    primary: '#98002E',
    secondary: '#F9A01B',
    accent: '#000000',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Orlando Magic': {
    primary: '#0077C0',
    secondary: '#C4CED4',
    accent: '#000000',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Washington Wizards': {
    primary: '#002B5C',
    secondary: '#E31837',
    accent: '#C4CED4',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  // NBA — NORTHWEST
  'Denver Nuggets': {
    primary: '#0E2240',
    secondary: '#FEC524',
    accent: '#8B2131',
    alternate: '#1D428A',
    text: '#FFFFFF',
  },

  'Minnesota Timberwolves': {
    primary: '#0C2340',
    secondary: '#236192',
    accent: '#78BE20',
    alternate: '#9EA2A2',
    text: '#FFFFFF',
  },

  'Oklahoma City Thunder': {
    primary: '#007AC1',
    secondary: '#EF3B24',
    accent: '#FDBB30',
    alternate: '#002D62',
    text: '#FFFFFF',
  },

  'Portland Trail Blazers': {
    primary: '#E03A3E',
    secondary: '#000000',
    accent: '#FFFFFF',
    alternate: '#C4CED4',
    text: '#FFFFFF',
  },

  'Utah Jazz': {
    primary: '#002B5C',
    secondary: '#00471B',
    accent: '#F9A01B',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  // NBA — PACIFIC
  'Golden State Warriors': {
    primary: '#1D428A',
    secondary: '#FFC72C',
    accent: '#FFFFFF',
    alternate: '#26282A',
    text: '#FFFFFF',
  },

  'Los Angeles Clippers': {
    primary: '#C8102E',
    secondary: '#1D428A',
    accent: '#000000',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'LA Clippers': {
    primary: '#C8102E',
    secondary: '#1D428A',
    accent: '#000000',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Los Angeles Lakers': {
    primary: '#552583',
    secondary: '#FDB927',
    accent: '#FFFFFF',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'Phoenix Suns': {
    primary: '#1D1160',
    secondary: '#E56020',
    accent: '#F9A01B',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'Sacramento Kings': {
    primary: '#5A2D81',
    secondary: '#63727A',
    accent: '#000000',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  // NBA — SOUTHWEST
  'Dallas Mavericks': {
    primary: '#00538C',
    secondary: '#002B5E',
    accent: '#B8C4CA',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'Houston Rockets': {
    primary: '#CE1141',
    secondary: '#000000',
    accent: '#C4CED4',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Memphis Grizzlies': {
    primary: '#5D76A9',
    secondary: '#12173F',
    accent: '#F5B112',
    alternate: '#707271',
    text: '#FFFFFF',
  },

  'New Orleans Pelicans': {
    primary: '#0C2340',
    secondary: '#C8102E',
    accent: '#85714D',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'San Antonio Spurs': {
    primary: '#000000',
    secondary: '#C4CED4',
    accent: '#FFFFFF',
    alternate: '#8A8D8F',
    text: '#FFFFFF',
  },

  // NFL — starter colors
  'Dallas Cowboys': {
    primary: '#041E42',
    secondary: '#869397',
    accent: '#FFFFFF',
    alternate: '#003594',
    text: '#FFFFFF',
  },

  'Kansas City Chiefs': {
    primary: '#E31837',
    secondary: '#FFB81C',
    accent: '#FFFFFF',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'San Francisco 49ers': {
    primary: '#AA0000',
    secondary: '#B3995D',
    accent: '#FFFFFF',
    alternate: '#000000',
    text: '#FFFFFF',
  },

  'New England Patriots': {
    primary: '#002244',
    secondary: '#C60C30',
    accent: '#B0B7BC',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Pittsburgh Steelers': {
    primary: '#000000',
    secondary: '#FFB612',
    accent: '#C60C30',
    alternate: '#00539B',
    text: '#FFFFFF',
  },

  // MLB — starter colors
  'Los Angeles Dodgers': {
    primary: '#005A9C',
    secondary: '#FFFFFF',
    accent: '#EF3E42',
    alternate: '#A5ACAF',
    text: '#FFFFFF',
  },

  'New York Yankees': {
    primary: '#0C2340',
    secondary: '#C4CED3',
    accent: '#FFFFFF',
    alternate: '#003087',
    text: '#FFFFFF',
  },

  'Boston Red Sox': {
    primary: '#BD3039',
    secondary: '#0C2340',
    accent: '#FFFFFF',
    alternate: '#C4CED4',
    text: '#FFFFFF',
  },

  'San Francisco Giants': {
    primary: '#FD5A1E',
    secondary: '#27251F',
    accent: '#EFD19F',
    alternate: '#FFFFFF',
    text: '#FFFFFF',
  },

  'Chicago Cubs': {
    primary: '#0E3386',
    secondary: '#CC3433',
    accent: '#FFFFFF',
    alternate: '#C4CED4',
    text: '#FFFFFF',
  },
};

export function getTeamColors(teamName: string): TeamColor {
  return (
    teamColors[teamName] || {
      primary: '#111111',
      secondary: '#f5c542',
      accent: '#ffffff',
      alternate: '#000000',
      text: '#ffffff',
    }
  );
}
