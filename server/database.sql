CREATE DATABASE uprooted;

--users
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  coins INTEGER,
  PRIMARY KEY (user_id)
);

--trees
CREATE TABLE trees(
  tree_id SERIAL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  PRIMARY KEY (tree_id)
);

--user trees
CREATE TABLE user_trees(
  user_tree_id SERIAL,
  tree_id SERIAL,
  user_id UUID,
  level INTEGER NOT NULL,
  time TIME NOT NULL,
  PRIMARY KEY (user_tree_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (tree_id) REFERENCES trees(tree_id)
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

INSERT INTO users (user_name, user_email, user_password) values ('pog', 'jacobee@gmail.com', 'literallyanthing');

--add shop trees
INSERT INTO trees (name, type, cost) values ('oak1', 'oak', 20);
INSERT INTO trees (name, type, cost) values ('oak2', 'oak', 40);
INSERT INTO trees (name, type, cost) values ('oak3', 'oak', 80);
INSERT INTO trees (name, type, cost) values ('oak4', 'oak', 20);
INSERT INTO trees (name, type, cost) values ('oak5', 'oak', 60);
INSERT INTO trees (name, type, cost) values ('oak6', 'oak', 40);