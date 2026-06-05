export type SportKey = 'nba' | 'nfl' | 'mlb';

export const sports = {
  nba: {
    name: 'NBA',
    perfectRecord: '82-0',
    reSpins: 3,
    roster: ['PG', 'SG', 'SF', 'PF', 'C', '6th Man'],
    teams: ['Lakers', 'Celtics', 'Bulls', 'Warriors', 'Spurs', 'Heat', 'Knicks', '76ers'],
    eras: ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
  },
  nfl: {
    name: 'NFL',
    perfectRecord: '17-0',
    reSpins: 6,
    roster: ['QB', 'RB', 'WR1', 'WR2', 'TE', 'FLEX', 'Offensive Line', 'Team Defense + Decade'],
    teams: ['Patriots', 'Cowboys', '49ers', 'Steelers', 'Chiefs', 'Packers', 'Ravens', 'Bears'],
    eras: ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
  },
  mlb: {
    name: 'MLB',
    perfectRecord: '162-0',
    reSpins: 5,
    roster: ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'SP1', 'SP2', 'SP3', 'SP4', 'SP5', 'Bullpen + Decade'],
    teams: ['Yankees', 'Dodgers', 'Red Sox', 'Cardinals', 'Giants', 'Braves', 'Mets', 'Cubs'],
    eras: ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
  },
} as const;

export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
