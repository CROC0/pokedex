import type { Pokemon, PokemonSpecies } from "@/typedef/pokemon";
import { NamedAPIResource } from "@/typedef/utility";
import { EvolutionChain } from "@/typedef/evolution";
import { toTitleCase } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import Footer from "@/components/Footer";
import DumbbellIcon from "@/components/icon/dumbell";
import { Badge } from "@/components/ui/badge";
import ShieldIcon from "@/components/icon/shield";
import HeartIcon from "@/components/icon/heart";
import BoltIcon from "@/components/icon/bolt";
import BasicHeader from "@/components/BasicHeader";
import BackButton from "@/components/BackButton";
import MovesList from "@/components/MovesList";
import PokeCard from "@/components/PokeCard";
import Image from "next/image";

interface props {
  params: { name: string };
}

export default async function Page({ params }: props) {
  const { name } = params;
  const pokemonFn: Promise<Pokemon> = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
  const speciesFn: Promise<PokemonSpecies> = fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`).then((res) => res.json());
  const [pokemon, species] = await Promise.all([pokemonFn, speciesFn]);

  const evolutionsFn: Promise<EvolutionChain> = fetch(species.evolution_chain.url).then((res) => res.json());

  const [evolution] = await Promise.all([evolutionsFn]);

  const evolutionList = flattenEvolutions(evolution);

  return (
    <div className="flex flex-col min-h-screen">
      <BasicHeader />
      <main className="flex-1 bg-muted/40 py-8">
        <div className="px-8 pb-4">
          <BackButton />
        </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square flex items-center justify-center bg-muted/20 p-4">
              <Image
                src={
                  (pokemon.sprites.other && pokemon.sprites.other["official-artwork"] && pokemon.sprites.other["official-artwork"].front_default) ??
                  pokemon.sprites.front_default
                }
                alt={name}
                width={256 * 10}
                height={256 * 10}
                className="w-full h-full object-contain"
                style={{ aspectRatio: "256/256", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="bg-background rounded-lg shadow-md p-6 space-y-4">
            <h1 className="text-3xl font-bold">{toTitleCase(name)}</h1>
            <div className="flex items-center gap-2">
              {pokemon.types.map((type) => (
                <Badge key={name + type.type} variant="outline" className="bg-grass-100 text-grass-700">
                  {type.type.name}
                </Badge>
              ))}
            </div>
            <div className="prose">
              <p>
                {species.flavor_text_entries
                  .sort((a) => (a.version.name == "red" ? -99 : 99))[0]
                  .flavor_text.replace(/\f/g, "\n")
                  .replace(/\u00ad\n/g, "")
                  .replace(/\u00ad/g, "")
                  .replace(/ -\n/g, " - ")
                  .replace(/-\n/g, "-")
                  .replace(/\n/g, " ")}
              </p>
            </div>
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DumbbellIcon className="w-5 h-5" />
                  <span className="hidden sm:block">Attack: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "attack")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5" />
                  <span className="hidden sm:block">Defense: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "defense")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  <span className="hidden sm:block">HP: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "hp")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <BoltIcon className="w-5 h-5" />
                  <span className="hidden sm:block">Speed: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "speed")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <DumbbellIcon className="w-5 h-5 text-black" fill />
                  <span className="hidden sm:block">Sp. Attack: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "special-attack")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-black" fill />
                  <span className="hidden sm:block">Sp. Defense: </span>
                  {pokemon.stats
                    .filter((s) => s.stat.name == "special-defense")
                    .map((s) => (
                      <span key={s.stat.url}>{s.base_stat}</span>
                    ))}
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">Evolutions</h2>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {evolutionList.map((evo) => (
                <PokeCard key={evo.species_name} name={evo.species_name} url={`https://pokeapi.co/api/v2/pokemon/${evo.species_name}`} imageSize={100} />
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">Moves</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Base Power</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Level Learned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <MovesList moves={pokemon.moves} types={pokemon.types} />
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface FlatEvolutionChain {
  species_name: string;
  min_level: number;
  trigger_name: string | null;
  item: NamedAPIResource | null;
}

function flattenEvolutions(data: EvolutionChain) {
  let evoData = data.chain;
  const evoChain: FlatEvolutionChain[] = [];

  do {
    var evoDetails = evoData["evolution_details"][0];

    evoChain.push({
      species_name: evoData.species.name,
      min_level: !evoDetails ? 1 : evoDetails.min_level,
      trigger_name: !evoDetails ? null : evoDetails.trigger.name,
      item: !evoDetails ? null : evoDetails.item,
    });

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
  return evoChain;
}
