export interface PokemonSimple {
  id: number;
  name: string;
  image_url: string;
}

export interface PokemonDetail extends PokemonSimple {
  height: number;
  weight: number;
  types: string[]; 
}