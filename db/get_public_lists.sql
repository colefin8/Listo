SELECT * FROM list l 
JOIN groups g 
ON l.list_id = g.list_id 
WHERE g.user_id = $1;