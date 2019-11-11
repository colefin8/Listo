INSERT into groups (list_id, user_id) SELECT $1, u.user_id from users u where u.email = $2
RETURNING *;