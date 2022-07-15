-- CREATE DATABASE authtodo;

-- CREATE TABLE users(
--   user_id uuid DEFAULT uuid_generate_v4(),
--   user_name VARCHAR(255) NOT NULL,
--   user_email VARCHAR(255) NOT NULL UNIQUE,
--   user_password VARCHAR(255) NOT NULL,
--   PRIMARY KEY(user_id)
-- );

-- CREATE TABLE todo(
--   todo_id SERIAL,
--   user_id UUID ,
--   description VARCHAR(255),
--   PRIMARY KEY (todo_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );


CREATE DATABASE authtodolist;

--users

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  coins INTEGER,
  PRIMARY KEY (user_id)
);

--todos (coins)

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--trees
CREATE TABLE trees(
  tree_id SERIAL,
  user_id UUID,
  name VARCHAR(255) NOT NULL,
  level INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  time TIME NOT NULL,
  PRIMARY KEY (tree_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--shop
CREATE TABLE shop(
  item_id UUID DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  unlocked BOOLEAN NOT NULL,
  PRIMARY KEY (item_id)
);

--fake users data

insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data

insert into todos (user_id, description) values ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'clean room');