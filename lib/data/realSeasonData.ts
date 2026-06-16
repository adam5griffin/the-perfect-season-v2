import type { SeasonTeam } from '../gameData';
import { nba2010Seasons } from './nba/nba2010';

export const realSeasonData: SeasonTeam[] = [
  ...nba2010Seasons,
];
