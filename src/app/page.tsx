"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import type { PokemonItem, PokemonList } from "@/typedef/pokemon";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PokeContainer from "@/components/PokeContainer";
import ListPagination from "@/components/ListPagination";

export default function Page() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
  const [searchPokemon, setSearchPokemon] = useState<PokemonItem[]>([]);
  const [displayPokemon, setDisplayPokemon] = useState<PokemonItem[]>([]);
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [offset, setOffset] = useState(Number(params.get("o") ?? 0));
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      const { pokemon: pokemonList }: PokemonList = await fetch("/results.json").then((r) => r.json());
      setPokemon(pokemonList);
      const filteredList = pokemonList.filter((p) => p.name.includes(search));
      setSearchPokemon(filteredList);
      const displayList = filteredList.slice(offset, offset + limit);
      setDisplayPokemon(displayList);
      setLoading(false);
    }
    getPokemon();
  }, []);

  useEffect(() => {
    const tmp = pokemon.filter((p) => p.name.includes(search));
    setSearchPokemon(tmp);
    setDisplayPokemon(tmp.slice(offset, offset + limit));
  }, [search, offset]);

  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
    setOffset(0);

    params.set("q", searchTerm);
    replace(`${pathname}?${params.toString()}`);
    params.set("o", String(0));
    replace(`${pathname}?${params.toString()}`);
  }

  function HandleChangeOffset(newOffset: number) {
    setOffset(newOffset);
    params.set("o", String(newOffset));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header handleSearch={handleSearch} />
      <ListPagination count={searchPokemon.length} limit={limit} offset={offset} handleChangeOffset={HandleChangeOffset} />
      <main className="flex-1 bg-muted/40 py-8">
        <PokeContainer pokemon={displayPokemon} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
