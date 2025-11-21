// src/scripts/seed.ts
import db from '../db'; 

import fetch from 'node-fetch';


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

const POKEMON_COUNT = 151; 

async function seedDatabase() {
  console.log('Iniciando el seeder...');
  try {
    const client = await db.query<{ now: string }>('SELECT NOW()'); 
    console.log('Conexión a la BD exitosa:', client.rows[0].now);

    for (let i = 1; i <= POKEMON_COUNT; i++) {
  
      console.log(`Buscando Pokémon #${i}...`);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      
   
      const data = (await res.json()) as PokeApiResponse;

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

      for (const typeInfo of data.types) {
        const typeName = typeInfo.type.name;

        const typeQuery = `
          INSERT INTO types (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;
        `;
        await db.query(typeQuery, [typeName]);

        const { rows } = await db.query<{ id: number }>('SELECT id FROM types WHERE name = $1', [typeName]);
        const typeId = rows[0].id;

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

seedDatabase();
