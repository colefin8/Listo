UPDATE item
SET name = $2,
price = $3,
notes = $4,
image = $5,
link = $6
WHERE item_id = $1;