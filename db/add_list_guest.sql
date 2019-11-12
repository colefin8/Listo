INSERT INTO 
list
( name,
budget,
private,
creator_id
)
values( $1, $2, false, 1 )
RETURNING *;