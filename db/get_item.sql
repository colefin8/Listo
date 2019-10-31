SELECT u.email, i.name, i.price, i.notes, i.image, i.link, i.creator_id
FROM item i 
JOIN users u 
ON u.user_id = i.creator_id
WHERE i.item_id= $1;