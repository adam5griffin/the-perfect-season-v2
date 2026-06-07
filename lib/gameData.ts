export type SportKey = 'nba' | 'nfl' | 'mlb';

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
      'Team Defense'
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
      'Bullpen'
    ],
  },
} as const;

export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
