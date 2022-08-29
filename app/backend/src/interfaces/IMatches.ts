export interface Indexable {
  id: number
}

export interface IMatcheGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches extends IMatcheGoals {
  homeTeam: number;
  awayTeam: number;
}

export interface ICreateMatch extends IMatches {
  inProgress: boolean;
}

export interface ICreateMatchResponse extends Indexable, IMatches {
  inProgress: boolean;
}
