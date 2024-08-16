"use client";

import type { PokemonItem } from "@/typedef/pokemon";
import PokeCard from "./PokeCard";
import SkeletonCard from "./SkeletonCard";

interface props {
  pokemon: PokemonItem[];
  loading: boolean;
}

function PokeContainer({ pokemon, loading }: props) {
  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(10)
              .fill(undefined)
              .map((p) => <SkeletonCard key={Math.random()} />)
          : pokemon.map((p) => <PokeCard key={p.name} name={p.name} url={p.url} />)}
      </div>
    </div>
  );
}

export default PokeContainer;
