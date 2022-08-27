# Desafio 2
SELECT
	(SELECT count(*) FROM SpotifyClone.cancoes) as cancoes,
	(SELECT count(*) FROM SpotifyClone.artistas) as artistas,
	(SELECT count(*) FROM SpotifyClone.albuns) as albuns
FROM dual;

# Desafio 3
SELECT 
	U.usuario as usuario,
	COUNT(H.cancao_id) as qtde_musicas_ouvidas,
    ROUND(SUM(C.duracao_segundos)/60, 2) as total_minutos
FROM SpotifyClone.usuarios AS U
INNER JOIN
	SpotifyClone.historico AS H ON U.usuario_id = H.usuario_id
INNER JOIN
	SpotifyClone.cancoes AS C ON H.cancao_id = C.cancao_id
GROUP BY U.usuario
ORDER BY U.usuario;

# Desafio 4
# Crie uma QUERY que deve mostrar as pessoas usuárias que estavam ativas no ano de 2021 se baseando na data mais recente 
# no histórico de reprodução.
# A primeira coluna deve possuir o alias "usuario" e exibir o nome da pessoa usuária.
# A segunda coluna deve ter o alias "condicao_usuario" e exibir se a pessoa usuária está ativa ou inativa.
SELECT 
	U.usuario as usuario,
	CASE
        WHEN MAX(YEAR(H.data_reproducao)) = '2021' THEN 'Usuário ativo'
        ELSE 'Usuário inativo'
    END AS condicao_usuario
FROM SpotifyClone.usuarios AS U
INNER JOIN
	SpotifyClone.historico AS H ON U.usuario_id = H.usuario_id
GROUP BY U.usuario
ORDER BY U.usuario;

# Desafio 5
# Crie uma QUERY que possua duas colunas:
# A primeira coluna deve possuir o alias "cancao" e exibir o nome da canção.
# A segunda coluna deve possuir o alias "reproducoes" e exibir a quantidade de pessoas que já escutaram a canção em questão.

SELECT
	C.cancao as cancao,
	COUNT(H.usuario_id) as reproducoes
FROM SpotifyClone.cancoes AS C
INNER JOIN
	SpotifyClone.historico AS H ON C.cancao_id = H.cancao_id
GROUP BY C.cancao
ORDER BY reproducoes DESC, C.cancao
LIMIT 2;

# Desafio 6
# Tendo como base o valor dos planos e o plano que cada pessoa usuária cadastrada possui no banco, queremos algumas informações 
# sobre o faturamento da empresa. Crie uma QUERY que deve exibir quatro dados:
# A primeira coluna deve ter o alias "faturamento_minimo" e exibir o menor valor de plano existente para uma pessoa usuária.
# A segunda coluna deve ter o alias "faturamento_maximo" e exibir o maior valor de plano existente para uma pessoa usuária.
# A terceira coluna deve ter o alias "faturamento_medio" e exibir o valor médio dos planos possuídos por pessoas usuárias até o momento.
# Por fim, a quarta coluna deve ter o alias "faturamento_total" e exibir o valor total obtido com os planos possuídos por pessoas usuárias.
SELECT
	MIN(P.valor_plano) as faturamento_minimo,
	MAX(P.valor_plano) as faturamento_maximo,
    ROUND(AVG(valor_plano),2) as faturamento_medio,
    ROUND(SUM(valor_plano),2) as faturamento_total
FROM SpotifyClone.usuarios AS U
INNER JOIN
	SpotifyClone.planos AS P ON P.plano_id = U.planos_plano_id;

# Desafio 7
# Mostre uma relação de todos os álbuns produzidos por cada pessoa artista, com a quantidade de seguidores que ela possui, 
# de acordo com os detalhes a seguir. Para tal, crie uma QUERY com as seguintes colunas:
# A primeira coluna deve exibir o nome da pessoa artista, com o alias "artista".
# A segunda coluna deve exibir o nome do álbum, com o alias "album".
# A terceira coluna deve exibir a quantidade de pessoas seguidoras que aquela pessoa artista possui e deve possuir o alias "seguidores".
SELECT
	A.artista as artista,
	AL.album as album,
    (SELECT COUNT(S.artista_id) FROM SpotifyClone.seguidores as S WHERE S.artista_id = A.artista_id) as seguidores
FROM SpotifyClone.artistas AS A
INNER JOIN
	SpotifyClone.albuns AS AL ON A.artista_id = AL.artistas_artista_id
ORDER BY seguidores DESC, A.artista, AL.album;

# Desafio 8
SELECT
	A.artista as artista,
	AL.album as album
FROM SpotifyClone.artistas AS A
INNER JOIN
	SpotifyClone.albuns AS AL ON A.artista_id = AL.artistas_artista_id
WHERE A.artista = 'Walter Phoenix'
ORDER BY album;

# Desafio 9
# Crie uma QUERY que exibe a quantidade de músicas que estão presentes atualmente no histórico de reprodução de uma pessoa usuária 
# específica. Para este caso queremos saber quantas músicas estão no histórico do usuário "Bill" e a consulta deve retornar a seguinte coluna:
# O valor da quantidade, com o alias "quantidade_musicas_no_historico".
SELECT 
	COUNT(H.cancao_id) as quantidade_musicas_no_historico
FROM SpotifyClone.usuarios AS U
INNER JOIN
	SpotifyClone.historico AS H ON U.usuario_id = H.usuario_id
WHERE U.usuario LIKE 'Bill%'
GROUP BY U.usuario;

# Desafio 10
# Crie uma QUERY que exiba o nome e a quantidade de vezes que cada canção foi tocada por pessoas usuárias do plano gratuito ou pessoal 
# de acordo com os detalhes a seguir:
# A primeira coluna deve exibir o nome da canção, com o alias "nome";
# A segunda coluna deve exibir a quantidade de pessoas que já escutaram aquela canção, com o alias "reproducoes";
# Seus resultados devem estar agrupados pelo nome da canção e ordenados em ordem alfabética.
SELECT
	C.cancao as nome,
	COUNT(H.usuario_id) as reproducoes
FROM SpotifyClone.cancoes AS C
INNER JOIN
	SpotifyClone.historico AS H ON C.cancao_id = H.cancao_id
INNER JOIN
	SpotifyClone.usuarios AS U ON U.usuario_id = H.usuario_id
WHERE U.planos_plano_id = 1 OR U.planos_plano_id = 4
GROUP BY nome
ORDER BY nome;

# Desafio 11 (BONUS)
# Crie uma QUERY que altere o nome de algumas músicas e as ordene em ordem alfabética
SELECT
	C.cancao as nome_musica,
    CASE
		WHEN C.cancao LIKE "%Streets" THEN REPLACE (C.cancao, "Streets", "Code Review")
        WHEN C.cancao LIKE "%Her Own" THEN REPLACE (C.cancao, "Her Own", "Trybe")
        WHEN C.cancao LIKE "%Inner Fire" THEN REPLACE (C.cancao, "Inner Fire", "Project")
        WHEN C.cancao LIKE "%Silly" THEN REPLACE (C.cancao, "Silly", "Nice")
        WHEN C.cancao LIKE "%Circus" THEN REPLACE (C.cancao, "Circus", "Pull Request")
     END as novo_nome
FROM SpotifyClone.cancoes as C
WHERE C.cancao LIKE "%Streets" OR
	  C.cancao LIKE "%Her Own" OR
	  C.cancao LIKE "%Inner Fire" OR
	  C.cancao LIKE "%Silly" OR
	  C.cancao LIKE "%Circus"
ORDER BY C.cancao;

