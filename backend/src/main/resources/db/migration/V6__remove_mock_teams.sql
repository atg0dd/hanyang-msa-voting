DELETE FROM votes
WHERE team_id IN (SELECT id FROM teams WHERE slug IN ('digital-future', 'student-first', 'green-erica'));

DELETE FROM verification_codes
WHERE team_id IN (SELECT id FROM teams WHERE slug IN ('digital-future', 'student-first', 'green-erica'));

DELETE FROM teams
WHERE slug IN ('digital-future', 'student-first', 'green-erica');
