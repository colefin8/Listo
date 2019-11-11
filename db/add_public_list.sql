INSERT INTO 
list
( name,
budget,
private,
creator_id
)
SELECT $1, $2, $3, u.user_id 
FROM users u 
WHERE u.email = $4;

INSERT INTO groups 
(user_id,
list_id
)
SELECT creator_id, list_id FROM list ORDER BY list_id DESC LIMIT 1
RETURNING list_id;