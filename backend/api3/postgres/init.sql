CREATE DATABASE monster_high;
\c monster_high;

CREATE TABLE especies (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    edad INT,
    especie_id INT REFERENCES especies(id),
    personalidad TEXT
);
