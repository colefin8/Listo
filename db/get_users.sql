SELECT u.email, u.profile_pic 
FROM users u 
JOIN groups g ON u.user_id = g.user_id
JOIN list l ON g.list_id = l.list_id
WHERE l.list_id = $1