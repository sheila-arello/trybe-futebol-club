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
      goalsOwn DESC;
______________________________________________________________
SELECT TR.home_team as homeTeam,
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
ORDER BY TR.home_team;

SELECT TR.home_team, SUM(TR.resultado) 
FROM (
		SELECT home_team, 
			CASE 
				WHEN (home_team_goals - away_team_goals) > 0 THEN 3
				WHEN (home_team_goals - away_team_goals) < 0 THEN 0 
				WHEN (home_team_goals - away_team_goals) = 0 THEN 1 
			END as resultado 
			FROM matches as M
		where in_progress = false
		order by home_team
	) as TR
GROUP BY TR.home_team
ORDER BY TR.home_team;

const query = {
  attributes: [
    'home_team',
    [Sequelize.literal(`CASE 
				WHEN (home_team_goals - away_team_goals) > 0 THEN 3
				WHEN (home_team_goals - away_team_goals) < 0 THEN 0 
				WHEN (home_team_goals - away_team_goals) = 0 THEN 1 
			END`), 'result'],
  ],
  where: { inProgress: false },
};

    const query = {
      attributes: <any> [
        'home_team',
        [Sequelize.literal(`CASE 
            WHEN (home_team_goals - away_team_goals) > 0 THEN 3
            WHEN (home_team_goals - away_team_goals) < 0 THEN 0 
            WHEN (home_team_goals - away_team_goals) = 0 THEN 1 
          END`), 'result'],
      ],
      where: { inProgress: false },
    };


  // var query = {
  //   attributes: [
  //     'userId',
  //     [Sequelize.literal(`MAX(CASE Type WHEN 'Employee' THEN Rate ELSE 0 END)`), 'Employee'],
  //     [Sequelize.literal(`MAX(CASE Type WHEN 'School' THEN Rate ELSE 0 END)`), 'School'],
  //     [Sequelize.literal(`MAX(CASE Type WHEN 'Public' THEN Rate ELSE 0 END)`), 'Public'],
  //     [Sequelize.literal(`MAX(CASE Type WHEN 'Other' THEN Rate ELSE 0 END)`), 'Other'],
  //   ],
  //   where: {
  //     user: userId,
  //     Type: ['Employee', 'School', 'Public', 'Other'],
  //   },
  //   group: ['userId'],
  //   raw: true
  // };
  // models.invoice.findAll(query).then(result => {
  //   console.log(result);
  // });
