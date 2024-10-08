"use client";
import { useEffect, useState } from "react";
import type { PokemonItem, PokemonList } from "@/typedef/pokemon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PokeContainer from "@/components/PokeContainer";
import ListPagination from "@/components/ListPagination";

const LIMIT = 8;

export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
  const [searchPokemon, setSearchPokemon] = useState<PokemonItem[]>([]);
  const [displayPokemon, setDisplayPokemon] = useState<PokemonItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      const localPokemon = sessionStorage.getItem("pokemon");
      const LocalSearchPokemon = sessionStorage.getItem("search");
      const localDisplayPokemon = sessionStorage.getItem("display");
      const localSearchTerm = sessionStorage.getItem("searchTerm");
      const localOffset = sessionStorage.getItem("offset");
      if (localPokemon && LocalSearchPokemon && localDisplayPokemon) {
        setPokemon(JSON.parse(localPokemon));
        setSearchPokemon(JSON.parse(LocalSearchPokemon));
        setDisplayPokemon(JSON.parse(localDisplayPokemon));
        if (localSearchTerm) setSearchTerm(JSON.parse(localSearchTerm));
        if (localOffset) setOffset(Number(JSON.parse(localOffset)));
      } else {
        console.log("fetching");
        const { pokemon: pokemonList }: PokemonList = await fetch("/results.json").then((r) => r.json());
        setPokemon(pokemonList);
        sessionStorage.setItem("pokemon", JSON.stringify(pokemonList));
        const filteredList = pokemonList.filter((p) => p.name.includes(searchTerm));
        setSearchPokemon(filteredList);
        sessionStorage.setItem("search", JSON.stringify(filteredList));
        const displayList = filteredList.slice(offset, offset + LIMIT);
        setDisplayPokemon(displayList);
        sessionStorage.setItem("display", JSON.stringify(displayList));
      }
      setLoading(false);
    }

    getPokemon();
  }, []);

  function handleSearch(searchTerm: string) {
    setSearchTerm(searchTerm);
    setOffset(0);
    const s = pokemon.filter((p) => p.name.includes(searchTerm));
    setSearchPokemon(s);
    const d = s.slice(0, 0 + LIMIT);
    setDisplayPokemon(d);
    sessionStorage.setItem("search", JSON.stringify(s));
    sessionStorage.setItem("display", JSON.stringify(d));
    sessionStorage.setItem("searchTerm", JSON.stringify(searchTerm));
    sessionStorage.setItem("offset", JSON.stringify(0));
  }

  function HandleChangeOffset(newOffset: number) {
    setOffset(newOffset);
    const s = pokemon.filter((p) => p.name.includes(searchTerm));
    setSearchPokemon(s);
    const d = s.slice(newOffset, newOffset + LIMIT);
    setDisplayPokemon(d);
    sessionStorage.setItem("offset", JSON.stringify(newOffset));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header handleSearch={handleSearch} />
      <ListPagination count={searchPokemon.length} limit={LIMIT} offset={offset} handleChangeOffset={HandleChangeOffset} />
      <main className="flex-1 bg-muted/40 py-8">
        <PokeContainer pokemon={displayPokemon} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
