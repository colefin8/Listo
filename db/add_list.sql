-- $1 listName, $2 budget, $3 shared boolean, $4 creator email
INSERT INTO 
list
( name,
budget,
private,
creator_id
)
SELECT $1, $2, $3, u.user_id 
FROM users u 
WHERE u.email = $4
RETURNING list_id;

-- INSERT INTO list (
-- name,
-- budget,
-- private,
-- creator_id
-- ) VALUES (
-- 'cole',
-- 56,
-- true,
-- 6
-- ) RETURNING list_id

-- SELECT * FROM list ORDER BY list_id DESC LIMIT 1;

-- If i return user_id it gives me an error bc user_id doesn't exist as a column in list.  RETURNING can only be used to get columns from the table being inserted into