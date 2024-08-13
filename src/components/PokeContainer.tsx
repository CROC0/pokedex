import type { PokemonList } from "@/typedef/pokemon";
import PokeCard from "./PokeCard";
import ListPagination from "./ListPagination";

interface props {
  offset: number;
}

const limit = 10;

async function PokeContainer({ offset }: props) {
  const pokemon: PokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then((r) => r.json());
  return (
    <div>
      <ListPagination current={Number(offset)} next={pokemon.next} previous={pokemon.previous} count={pokemon.count} limit={limit} />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemon.results.map((pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

export default PokeContainer;
