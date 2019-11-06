UPDATE users
SET email = $2,
profile_pic = $3
WHERE user_id = $1;