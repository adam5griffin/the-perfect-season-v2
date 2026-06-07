export type TeamColor = {
  primary: string;
  secondary: string;
  text: string;
};

export const teamColors: Record<string, TeamColor> = {
  // NBA
  'Los Angeles Lakers': {
    primary: '#552583',
    secondary: '#FDB927',
    text: '#ffffff',
  },
  'Chicago Bulls': {
    primary: '#CE1141',
    secondary: '#000000',
    text: '#ffffff',
  },
  'Golden State Warriors': {
    primary: '#1D428A',
    secondary: '#FFC72C',
    text: '#ffffff',
  },
  'Boston Celtics': {
    primary: '#007A33',
    secondary: '#BA9653',
    text: '#ffffff',
  },
  'New York Knicks': {
    primary: '#006BB6',
    secondary: '#F58426',
    text: '#ffffff',
  },

  // NFL
  'Dallas Cowboys': {
    primary: '#041E42',
    secondary: '#869397',
    text: '#ffffff',
  },
  'Kansas City Chiefs': {
    primary: '#E31837',
    secondary: '#FFB81C',
    text: '#ffffff',
  },
  'San Francisco 49ers': {
    primary: '#AA0000',
    secondary: '#B3995D',
    text: '#ffffff',
  },
  'New England Patriots': {
    primary: '#002244',
    secondary: '#C60C30',
    text: '#ffffff',
  },
  'Pittsburgh Steelers': {
    primary: '#000000',
    secondary: '#FFB612',
    text: '#ffffff',
  },

  // MLB
  'Los Angeles Dodgers': {
    primary: '#005A9C',
    secondary: '#FFFFFF',
    text: '#ffffff',
  },
  'New York Yankees': {
    primary: '#0C2340',
    secondary: '#C4CED3',
    text: '#ffffff',
  },
  'Boston Red Sox': {
    primary: '#BD3039',
    secondary: '#0C2340',
    text: '#ffffff',
  },
  'San Francisco Giants': {
    primary: '#FD5A1E',
    secondary: '#27251F',
    text: '#ffffff',
  },
  'Chicago Cubs': {
    primary: '#0E3386',
    secondary: '#CC3433',
    text: '#ffffff',
  },
};

export function getTeamColors(teamName: string): TeamColor {
  return (
    teamColors[teamName] || {
      primary: '#111111',
      secondary: '#f5c542',
      text: '#ffffff',
    }
  );
}
