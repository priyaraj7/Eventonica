CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	email VARCHAR ( 50 ) UNIQUE NOT NULL
	);

INSERT INTO users(name, email)
VALUES('Crush','crush@gmail.com');

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
	description VARCHAR (255),
    date DATE,
	isfavorite boolean DEFAULT FALSE
);

INSERT INTO 
    events (name, category, description, date)
VALUES
    ('Birthday', 'Celebration', 'A birthday party for my mom', '2022-09-01' ),
    ('JS Study group', 'Education', 'Techtonica study event', '2022-05-01');



