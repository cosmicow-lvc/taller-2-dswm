DROP TABLE IF EXISTS personajes;
DROP TABLE IF EXISTS especies;

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
-- Datos de ejemplo
INSERT INTO especies(nombre, descripcion) VALUES
('Dracula', 'Vampiros'),
('Lobo', 'Hombres lobo');

INSERT INTO personajes(nombre, edad, especie_id, personalidad) VALUES
('Draculaura', 16, 1, 'Amable y dulce'),
('Clawdeen Wolf', 16, 2, 'Valiente y feroz');