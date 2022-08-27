/* eslint-disable class-methods-use-this */
// import { ITotalPoints } from '../interfaces/IBoard';
import sequelize from '../database/models';
import Teams from '../database/models/teams';
// import Matches from '../database/models/matches';

export interface ILeaderboardService {
  totalPoints(): Promise<any>
  // pointsHomeTeam(): Promise<any>
}

const queryHomeTeam = `
SELECT TR.home_team as homeTeam,
  SUM(TR.result) as points,
  COUNT(TR.home_team) as games,
  COUNT(TR.result = 3) as win,
  COUNT(TR.result = 0) as lost,
  COUNT(TR.result = 1) as tie,
  SUM(TR.home_team_goals) as GP,
  SUM(TR.away_team_goals) as GC
FROM (
  SELECT home_team, home_team_goals, away_team_goals, 
      CASE 
        WHEN (home_team_goals - away_team_goals) > 0 THEN 3
        WHEN (home_team_goals - away_team_goals) < 0 THEN 0 
        WHEN (home_team_goals - away_team_goals) = 0 THEN 1 
      END as result 
      FROM matches as M
    WHERE in_progress = false 
    ORDER by home_team
  ) as TR
GROUP BY TR.home_team
ORDER BY TR.home_team;`;

const queryAwayTeam = `
SELECT TR.away_team as awayTeam,
  SUM(TR.result) as points,
  COUNT(TR.away_team) as games,
  COUNT(TR.result = 3) as win,
  COUNT(TR.result = 0) as lost,
  COUNT(TR.result = 1) as tie,
  SUM(TR.away_team_goals) as GP,
  SUM(TR.home_team_goals) as GC
FROM (
  SELECT away_team, away_team_goals, home_team_goals,
      CASE 
        WHEN (away_team_goals - home_team_goals) > 0 THEN 3
        WHEN (away_team_goals - home_team_goals) < 0 THEN 0 
        WHEN (away_team_goals - home_team_goals) = 0 THEN 1 
      END as result 
      FROM matches as M
    WHERE in_progress = false 
    ORDER by away_team
  ) as TR
GROUP BY TR.away_team
ORDER BY TR.away_team;`;

export default class LeaderboardService {
  // eslint-disable-next-line class-methods-use-this

  private include = [
    {
      model: Teams,
      foreignKey: 'homeTeam',
      as: 'teamHome',
      attributes: ['teamName'],
    }];

  // public async totalPointsLeaderboard(): Promise<void> {
  //   const htPoints = await this.pointsHomeTeam();
  //   const atPoints = await this.pointsAwayTeam();
  //   const totalPoints = htPoints.map((team: any) => (
  //     {
  //       teamId: team.homeTeam,
  //       points: Number(team.points) + Number(atPoints[team.homeTeam - 1].points),
  //     }
  //   ));

  //   return totalPoints;
  // }

  public async calcTotals(queryTeam: string): Promise<any> {
    const [totals] = await sequelize.query(queryTeam);
    return totals as unknown;
  }

  public async finalTableHT(): Promise<any> {
    console.log(queryAwayTeam);
    const results = await this.calcTotals(queryHomeTeam);
    console.log(results);
    // const teams = await this.teamsService.getById(Number(id));
    // {
    //   'name': team,
    //   'totalPoints': 11,
    //   'totalGames': 5,
    //   'totalVictories': 3,
    //   'totalDraws': 2,
    //   'totalLosses': 0,
    //   'goalsFavor': 12,
    //   'goalsOwn': 6,
    //   'goalsBalance': 6,
    //   'efficiency': 73.33
    // },
  }

  // public async pointsHomeTeam(): Promise<any> {
  //   const [pointsHT] = await sequelize.query(queryHomeTeam);
  //   return pointsHT as unknown;
  // }

  // public async pointsAwayTeam(): Promise<any> {
  //   const [pointsAT] = await sequelize.query(queryAwayTeam);
  //   return pointsAT as unknown;
  // }

  // public async totalPoints(): Promise<void> {
  //   const htPoints = await this.pointsHomeTeam();
  //   const atPoints = await this.pointsAwayTeam();
  //   const totalPoints = htPoints.map((team: any) => (
  //     {
  //       teamId: team.homeTeam,
  //       points: Number(team.points) + Number(atPoints[team.homeTeam - 1].points),
  //     }
  //   ));

  //   return totalPoints;
  // }
}
