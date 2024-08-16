"use client";

import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, toTitleCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { PokemonItem } from "@/typedef/pokemon";

interface props {
  pokemon: PokemonItem[];
  setPokemon: Dispatch<SetStateAction<PokemonItem[] | undefined>>;
}

export default function SearchBar({ pokemon, setPokemon }: props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? pokemon.find((pokemon) => pokemon.name === value)?.name : "Select pokemon..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search pokemon..." />
          <CommandList>
            <CommandEmpty>No pokemon found.</CommandEmpty>
            <CommandGroup>
              {pokemon.map((pokemon) => (
                <CommandItem
                  key={pokemon.name}
                  value={pokemon.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(`/pokemon/${currentValue}`);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === pokemon.name ? "opacity-100" : "opacity-0")} />
                  {toTitleCase(pokemon.name)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
