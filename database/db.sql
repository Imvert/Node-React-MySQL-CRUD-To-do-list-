CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tasks(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(300),
  done BOOLEAN NOT NULL DEFAULT 0,
  createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  //KEY user_id_idx (user_id) -> usar solo en planetscale
  FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO tasks (title, description) VALUES("limpiar la casa","que todo quede limpio"),
INSERT INTO tasks (title, description) VALUES("crear una app movil","utilizando flutter"),
INSERT INTO tasks (title, description) VALUES("esta es una tarea editada","primer edit"),
INSERT INTO tasks (title, description) VALUES("limpiar la cocina","muy bien");


