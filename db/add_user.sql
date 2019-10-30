INSERT INTO users (email, password) VALUES ($1, $2);
SELECT user_id, email, profile_pic FROM users where email = $1;