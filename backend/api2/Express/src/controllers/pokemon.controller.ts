import { Request, Response } from 'express';
import db from '../db';
import { PokemonDetail, PokemonSimple } from '../types/pokemon.types';

export const getPokemonList = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const query = 'SELECT id, name, image_url FROM pokemon ORDER BY id ASC LIMIT $1 OFFSET $2';
    
    const { rows } = await db.query<PokemonSimple>(query, [limit, offset]);

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getPokemonDetail = async (req: Request, res: Response) => {
  try {
    const { idOrName } = req.params;

    const isNumeric = /^\d+$/.test(idOrName);
    const column = isNumeric ? 'id' : 'name';
    const value = isNumeric ? parseInt(idOrName) : idOrName.toLowerCase();
    const pokemonQuery = `SELECT id, name, image_url, height, weight FROM pokemon WHERE ${column} = $1`;
    const pokemonResult = await db.query<Omit<PokemonDetail, 'types'>>(pokemonQuery, [value]);

    if (pokemonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    const pokemon = pokemonResult.rows[0];
    const typesQuery = `
      SELECT t.name 
      FROM types t
      JOIN pokemon_types pt ON t.id = pt.type_id
      WHERE pt.pokemon_id = $1
    `;
    const typesResult = await db.query<{ name: string }>(typesQuery, [pokemon.id]);
    
    const types = typesResult.rows.map(row => row.name);
    const responseData: PokemonDetail = {
      ...pokemon,
      types: types,
    };

    res.json(responseData);

    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { id, name, image_url, height, weight } = req.body;

    if (!id || !name) {
      return res.status(400).json({ error: 'ID y nombre son requeridos' });
    }

    const query = `
      INSERT INTO pokemon (id, name, image_url, height, weight)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    const { rows } = await db.query<PokemonSimple>(query, [id, name, image_url, height, weight]);

    res.status(201).json(rows[0]);

  } catch (err: any) {
  
    if (err.code === '23505') { 
      return res.status(409).json({ error: 'El ID o nombre del Pokémon ya existe' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image_url, height, weight } = req.body;

    const query = `
      UPDATE pokemon
      SET name = $1, image_url = $2, height = $3, weight = $4
      WHERE id = $5
      RETURNING *;
    `;
    
    const { rows } = await db.query<PokemonSimple>(query, [name, image_url, height, weight, id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }



    res.json(rows[0]);

  } catch (err: any) {
   
    if (err.code === '23505') {
      return res.status(409).json({ error: 'El nombre del Pokémon ya existe' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM pokemon WHERE id = $1 RETURNING *';
    
    const { rows } = await db.query<PokemonSimple>(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    res.json({ message: 'Pokémon eliminado exitosamente', pokemon: rows[0] });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};