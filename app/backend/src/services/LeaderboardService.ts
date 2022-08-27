/* eslint-disable class-methods-use-this */
// import { ITotalPoints } from '../interfaces/IBoard';
import sequelize from '../database/models';
// import Matches from '../database/models/matches';

export interface ILeaderboardService {
  finalTableHT(): Promise<any>
  finalTableAT(): Promise<any>
  // pointsHomeTeam(): Promise<any>
}

const queryHomeTeam = `
SELECT
  TEAM.team_name as name,
  SUM(TR.resultado) as totalPoints,
  COUNT(TR.home_team) as totalGames,
  SUM(IF(TR.resultado = 3, 1, 0)) as totalVictories,
  SUM(IF(TR.resultado = 1, 1, 0)) as totalDraws,
  SUM(IF(TR.resultado = 0, 1, 0)) as totalLosses,
  SUM(TR.home_team_goals) as goalsFavor,
  SUM(TR.away_team_goals) as goalsOwn,
  SUM(TR.home_team_goals) - SUM(TR.away_team_goals) as goalsBalance,
  ROUND((SUM(TR.resultado)/(COUNT(TR.home_team)*3)*100), 2) as efficiency
FROM (
      SELECT home_team, home_team_goals, away_team_goals,
      CASE 
        WHEN (home_team_goals - away_team_goals) > 0 THEN 3
        WHEN (home_team_goals - away_team_goals) < 0 THEN 0 
        WHEN (home_team_goals - away_team_goals) = 0 THEN 1 
      END as resultado
      FROM matches as M
      WHERE in_progress = false 
      ORDER by home_team
    ) as TR
INNER JOIN teams as TEAM ON TEAM.id = TR.home_team
GROUP BY TR.home_team
ORDER BY totalPoints DESC, 
      totalVictories DESC,
      goalsBalance DESC, 
      goalsFavor DESC,
      goalsOwn DESC;`;

const queryAwayTeam = `
SELECT
  TEAM.team_name as name,
  SUM(TR.resultado) as totalPoints,
  COUNT(TR.away_team) as totalGames,
  SUM(IF(TR.resultado = 3, 1, 0)) as totalVictories,
  SUM(IF(TR.resultado = 1, 1, 0)) as totalDraws,
  SUM(IF(TR.resultado = 0, 1, 0)) as totalLosses,
  SUM(TR.away_team_goals) as goalsFavor,
  SUM(TR.home_team_goals) as goalsOwn,
  SUM(TR.away_team_goals) - SUM(TR.away_team_goals) as goalsBalance,
  ROUND((SUM(TR.resultado)/(COUNT(TR.away_team)*3)*100), 2) as efficiency
FROM (
      SELECT away_team, away_team_goals, home_team_goals,
      CASE 
        WHEN (away_team_goals - home_team_goals) > 0 THEN 3
        WHEN (away_team_goals - home_team_goals) < 0 THEN 0 
        WHEN (away_team_goals - home_team_goals) = 0 THEN 1 
      END as resultado
      FROM matches as M
      WHERE in_progress = false 
      ORDER by away_team
    ) as TR
INNER JOIN teams as TEAM ON TEAM.id = TR.away_team
GROUP BY TR.away_team
ORDER BY totalPoints DESC, 
      totalVictories DESC,
      goalsBalance DESC, 
      goalsFavor DESC,
      goalsOwn DESC;`;

export default class LeaderboardService {
  // eslint-disable-next-line class-methods-use-this

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
    const results = await this.calcTotals(queryHomeTeam);
    return results;
  }

  public async finalTableAT(): Promise<any> {
    const results = await this.calcTotals(queryAwayTeam);
    return results;
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
