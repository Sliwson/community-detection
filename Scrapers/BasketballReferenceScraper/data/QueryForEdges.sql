with source as
(
	  SELECT
		LAG(p1.Id) OVER(ORDER BY p1.Id, p2.Id) PreviousPlayer1,
		LAG(p2.Id) OVER(ORDER BY p1.Id, p2.Id) PreviousPlayer2,
		p1.Id AS Player1, 
		p2.Id AS Player2, 
		s1.season,
		s1.club
	  FROM Seasons s1
	  JOIN Seasons s2 ON s1.season = s2.season AND s1.club = s2.club AND s1.club != 'TOT' AND s1.link != s2.link
	  JOIN Players p1 ON s1.link = p1.link
	  JOIN Players p2 ON s2.link = p2.link
	  WHERE p1.Id < p2.Id
)
-- Insert statements for procedure here
SELECT Player1 AS Player1_ID, Player2 AS Player2_ID, season AS Season, club AS Fist_Meet_Club FROM source
WHERE PreviousPlayer1 IS NULL or source.PreviousPlayer1 != source.Player1 or source.PreviousPlayer2 != source.Player2
ORDER BY Player1, Player2