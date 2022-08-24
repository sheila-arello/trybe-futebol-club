export interface Indexable {
  id: number
}

export interface IMatches {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ICreateMatch extends IMatches {
  inProgress: boolean;
}

export interface ICreateMatchResponse extends Indexable, IMatches {
  inProgress: boolean;
}
