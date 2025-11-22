-- Borra las tablas si ya existen (para poder re-ejecutar el script)
DROP TABLE IF EXISTS pokemon_types;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS types;

-- 1. Tabla de Tipos
CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- 2. Tabla de Pokémon
CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY, -- Usamos el ID de la Pokedex, no SERIAL
    name VARCHAR(100) UNIQUE NOT NULL,
    image_url VARCHAR(255),
    height INTEGER,
    weight INTEGER
);

-- 3. Tabla Pivote (Relación Muchos-a-Muchos)
CREATE TABLE pokemon_types (
    pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
    type_id INTEGER REFERENCES types(id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id, type_id) -- Clave primaria compuesta
);

-- (Opcional) Índices para acelerar búsquedas
CREATE INDEX idx_pokemon_name ON pokemon(name);
CREATE INDEX idx_type_name ON types(name);
