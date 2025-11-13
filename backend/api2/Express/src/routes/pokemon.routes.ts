import { Router } from 'express';

import { 
    getPokemonList, 
    getPokemonDetail,
    createPokemon,
    updatePokemon,
    deletePokemon } from '../controllers/pokemon.controller';

const router = Router();

router.get('/pokemon', getPokemonList);

router.get('/pokemon/:idOrName', getPokemonDetail);

router.post('/pokemon', createPokemon);

router.put('/pokemon/:id', updatePokemon);

router.delete('/pokemon/:id', deletePokemon);
export default router;