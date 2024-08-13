import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Pokemon } from "@/typedef/pokemon";
import { toTitleCase } from "@/lib/utils";

type props = {
  url: string;
  name: string;
};

async function PokeCard({ url, name }: props) {
  const pokemon: Pokemon = await fetch(url).then((res) => res.json());

  return (
    <Link href={`/pokemon/${name}`} className="bg-background rounded-lg shadow-md overflow-hidden" prefetch={false}>
      <div className="aspect-square flex items-center justify-center bg-muted/20 p-4">
        <Image
          src={
            (pokemon.sprites.other && pokemon.sprites.other["official-artwork"] && pokemon.sprites.other["official-artwork"].front_default) ??
            pokemon.sprites.front_default
          }
          alt={name}
          width="512"
          height="512"
          className="w-full h-full object-contain"
          style={{ aspectRatio: "128/128", objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{toTitleCase(name)}</h3>
        <div className="flex items-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <Badge key={name + type.type} variant="outline" className="bg-grass-100 text-grass-700">
              {type.type.name}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokeCard;
