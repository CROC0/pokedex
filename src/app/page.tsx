"use client";
import { useEffect, useState } from "react";
import type { PokemonItem, PokemonList } from "@/typedef/pokemon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PokeContainer from "@/components/PokeContainer";
import ListPagination from "@/components/ListPagination";

export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
  const [searchPokemon, setSearchPokemon] = useState<PokemonItem[]>([]);
  const [displayPokemon, setDisplayPokemon] = useState<PokemonItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      const localPokemon = localStorage.getItem("pokemon");
      const LocalSearchPokemon = localStorage.getItem("search");
      const localDisplayPokemon = localStorage.getItem("display");
      const localSearchTerm = localStorage.getItem("searchTerm");
      const localOffset = localStorage.getItem("offset");
      if (localPokemon && LocalSearchPokemon && localDisplayPokemon) {
        setPokemon(JSON.parse(localPokemon));
        setSearchPokemon(JSON.parse(LocalSearchPokemon));
        setDisplayPokemon(JSON.parse(localDisplayPokemon));
        setSearchTerm(JSON.parse(localSearchTerm ?? ""));
        setOffset(Number(JSON.parse(localOffset ?? "0")));
      } else {
        console.log("fetching");
        const { pokemon: pokemonList }: PokemonList = await fetch("/results.json").then((r) => r.json());
        setPokemon(pokemonList);
        localStorage.setItem("pokemon", JSON.stringify(pokemonList));
        const filteredList = pokemonList.filter((p) => p.name.includes(searchTerm));
        setSearchPokemon(filteredList);
        localStorage.setItem("search", JSON.stringify(filteredList));
        const displayList = filteredList.slice(offset, offset + limit);
        setDisplayPokemon(displayList);
        localStorage.setItem("display", JSON.stringify(displayList));
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
    const d = s.slice(0, 0 + limit);
    setDisplayPokemon(d);
    localStorage.setItem("search", JSON.stringify(s));
    localStorage.setItem("display", JSON.stringify(d));
    localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
    localStorage.setItem("offset", JSON.stringify(0));
  }

  function HandleChangeOffset(newOffset: number) {
    setOffset(newOffset);
    const s = pokemon.filter((p) => p.name.includes(searchTerm));
    setSearchPokemon(s);
    const d = s.slice(newOffset, newOffset + limit);
    setDisplayPokemon(d);
    localStorage.setItem("offset", JSON.stringify(newOffset));
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
