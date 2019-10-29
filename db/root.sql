CREATE TABLE users (
user_id serial primary key, password varchar(250), email varchar(50), profile_pic varchar(100));

CREATE TABLE list 
(list_id serial primary key, creator_id int references users(user_id), private boolean, budget float);

CREATE TABLE groups 
(group_id serial primary key, user_id int references users(user_id), list_id int references list(list_id));

CREATE TABLE item 
(item_id serial primary key, list_id int references list(list_id), creator_id int references users(user_id), name varchar(30), price float, notes varchar(400), image varchar(100), link varchar(100));
