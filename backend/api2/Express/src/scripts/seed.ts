// src/scripts/seed.ts
import db from '../db'; // Importa nuestra conexión a la BD
// NOTA: 'node-fetch' puede dar problemas con 'esModuleInterop'.
// Si da error, instala 'cross-fetch' (npm install cross-fetch) y usa:
// import fetch from 'cross-fetch';
import fetch from 'node-fetch';

// Definimos una interfaz simple para la data de la PokeAPI
interface PokeApiType {
  type: { name: string };
}

interface PokeApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokeApiType[];
}

const POKEMON_COUNT = 151; // Vamos a cargar la primera generación

async function seedDatabase() {
  console.log('Iniciando el seeder...');
  try {
    // --- CORRECCIÓN 1 ---
    // Le decimos a TS que esperamos un objeto con la propiedad 'now'
    const client = await db.query<{ now: string }>('SELECT NOW()'); 
    console.log('Conexión a la BD exitosa:', client.rows[0].now);

    for (let i = 1; i <= POKEMON_COUNT; i++) {
      // 1. Obtener datos de la PokeAPI
      console.log(`Buscando Pokémon #${i}...`);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      
      // Aserción de tipo para asegurar que data es del tipo correcto
      const data = (await res.json()) as PokeApiResponse;

      // 2. Insertar el Pokémon
      const pokemonQuery = `
        INSERT INTO pokemon (id, name, image_url, height, weight)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING;
      `;
      await db.query(pokemonQuery, [
        data.id,
        data.name,
        data.sprites.front_default,
        data.height,
        data.weight,
      ]);

      // 3. Insertar los tipos y la relación
      for (const typeInfo of data.types) {
        const typeName = typeInfo.type.name;

        // 3a. Asegurarse de que el tipo exista en la tabla 'types'
        const typeQuery = `
          INSERT INTO types (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;
        `;
        await db.query(typeQuery, [typeName]);

        // --- CORRECCIÓN 2 ---
        // Le decimos a TS que esperamos un objeto con la propiedad 'id'
        const { rows } = await db.query<{ id: number }>('SELECT id FROM types WHERE name = $1', [typeName]);
        const typeId = rows[0].id;

        // 3c. Insertar la relación en la tabla pivote
        const relationQuery = `
          INSERT INTO pokemon_types (pokemon_id, type_id)
          VALUES ($1, $2)
          ON CONFLICT (pokemon_id, type_id) DO NOTHING;
        `;
        await db.query(relationQuery, [data.id, typeId]);
      }
      console.log(`✅ Pokémon #${i} (${data.name}) agregado.`);
    }

    console.log('🎉 ¡Base de datos poblada con éxito!');
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
  }
}

// Ejecutar la función
seedDatabase();