import { ChangeEvent, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";

import type { PokemonItem } from "@/typedef/pokemon";
import SearchBar from "./SearchBar";
import SearchIcon from "./icon/search";
import { Input } from "./ui/input";

interface props {
  handleSearch: (searchTerm: string) => void;
}

function Header({ handleSearch: fn }: props) {
  const [searchTerm, setSearchterm] = useState(JSON.parse(localStorage.getItem("searchTerm") ?? ""));

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchterm(value);
    fn(value);
  }

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          Pokédex
        </Link>
        <div className="relative w-full max-w-md">
          {/* <SearchBar pokemon={pokemon} setPokemon={setPokemon} /> */}
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            type="search"
            placeholder="Search Pokémon..."
            className="w-full rounded-lg bg-primary-foreground/10 pl-10 pr-4 py-2 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
