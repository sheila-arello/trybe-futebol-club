/* eslint-disable class-methods-use-this */
// import { ITotalPoints } from '../interfaces/IBoard';
import { IBoard } from '../interfaces/IBoard';
import sequelize from '../database/models';

export interface ILeaderboardService {
  finalTableHT(): Promise<IBoard[]>
  finalTableAT(): Promise<IBoard[]>
  totalPointsLeaderboard(): Promise<IBoard[]>
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
  SUM(TR.away_team_goals) - SUM(TR.home_team_goals) as goalsBalance,
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

  public async calcTotals(queryTeam: string): Promise<IBoard[]> {
    const [totals] = await sequelize.query(queryTeam);
    return totals as IBoard[];
  }

  public async finalTableHT(): Promise<IBoard[]> {
    const results = await this.calcTotals(queryHomeTeam);
    return results;
  }

  public async finalTableAT(): Promise<IBoard[]> {
    const results = await this.calcTotals(queryAwayTeam);
    return results;
  }

  public sumWithAwayTeam(team: IBoard, awayTeam: IBoard): IBoard {
    const totalPoints = Number(team.totalPoints) + Number(awayTeam.totalPoints);
    const totalGames = Number(team.totalGames) + Number(awayTeam.totalGames);
    const goalsFavor = Number(team.goalsFavor) + Number(awayTeam.goalsFavor);
    const goalsOwn = Number(team.goalsOwn) + Number(awayTeam.goalsOwn);
    const efficiency = (((totalPoints) / (totalGames * 3)) * 100).toFixed(2);
    return {
      name: team.name,
      totalPoints,
      totalGames,
      totalVictories: Number(team.totalVictories) + Number(awayTeam.totalVictories),
      totalDraws: Number(team.totalDraws) + Number(awayTeam.totalDraws),
      totalLosses: Number(team.totalLosses) + Number(awayTeam.totalLosses),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    } as IBoard;
  }

  private sortLeaderboard(table: IBoard[]): IBoard[] {
    table.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;

      return 0;
    });
    console.log(table);
    return table;
  }

  public async totalPointsLeaderboard(): Promise<IBoard[]> {
    const htTable = await this.finalTableHT();
    const atTable = await this.finalTableAT();
    const finalTable = htTable.map((team) => {
      const awayTeam = atTable.find((aTeam) => aTeam.name === team.name) as IBoard;
      return this.sumWithAwayTeam(team, awayTeam);
    });
    return this.sortLeaderboard(finalTable);
  }
}
