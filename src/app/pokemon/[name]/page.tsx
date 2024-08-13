import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DumbbellIcon from "@/components/icon/dumbell";
import { Badge } from "@/components/ui/badge";
import ShieldIcon from "@/components/icon/shield";
import HeartIcon from "@/components/icon/heart";
import type { Pokemon } from "@/typedef/pokemon";
import { toTitleCase } from "@/lib/utils";
import BoltIcon from "@/components/icon/bolt";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface props {
  params: { name: string };
}

export default async function Page({ params }: props) {
  const { name } = params;
  const pokemon: Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40 py-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square flex items-center justify-center bg-muted/20 p-4">
              <img
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
                  <TableBody>
                    <TableRow>
                      <TableCell>Flamethrower</TableCell>
                      <TableCell>95</TableCell>
                      <TableCell>100%</TableCell>
                      <TableCell>Fire</TableCell>
                      <TableCell>36</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Wing Attack</TableCell>
                      <TableCell>60</TableCell>
                      <TableCell>100%</TableCell>
                      <TableCell>Flying</TableCell>
                      <TableCell>31</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dragon Claw</TableCell>
                      <TableCell>80</TableCell>
                      <TableCell>100%</TableCell>
                      <TableCell>Dragon</TableCell>
                      <TableCell>54</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fire Blast</TableCell>
                      <TableCell>110</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>Fire</TableCell>
                      <TableCell>43</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h2 className="text-xl font-bold">Abilities</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Blaze</li>
                  <li>Solar Power</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold">Other Facts</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Height: 5'07"</li>
                  <li>Weight: 199.5 lbs</li>
                  <li>Habitat: Mountains</li>
                  <li>Diet: Omnivore</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
