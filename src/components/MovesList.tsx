"use client";

import type { PokemonMove, PokemonType } from "@/typedef/pokemon";
import type { Move, MoveDetails } from "@/typedef/moves";
import { Suspense, useEffect, useState } from "react";
import MoveItem from "./MoveItem";
import { TableBody } from "./ui/table";

interface props {
  moves: PokemonMove[];
  types: PokemonType[];
}

function MovesList({ moves, types }: props) {
  const [moveDetails, setMoveDetails] = useState<MoveDetails[]>([]);

  useEffect(() => {
    async function getMoves() {
      console.log("running");
      const filteredMoves = moves.filter(filterMove);
      const fnArray = [];
      const lvl: Record<string, number> = {};

      for (let i = 0; i < filteredMoves.length; i++) {
        const data = filteredMoves[i];
        const moveFn = fetch(data.move.url).then((res) => res.json());
        fnArray.push(moveFn);
        lvl[data.move.name] = data.version_group_details.filter((gp) => gp.version_group.name == "red-blue")[0].level_learned_at;
      }

      const moveData = (await Promise.all(fnArray)) as Move[];
      const tmpArray: MoveDetails[] = [];
      moveData.forEach((move, index) => {
        tmpArray.push({
          name: move.name,
          accuracy: move.accuracy,
          power: move.power,
          type: move.type.name,
          level: lvl[move.name],
        });
      });

      const sorted = tmpArray
        .filter((a) => a.level != 0)
        .sort((a, b) => a.level - b.level)
        .concat(tmpArray.filter((a) => a.level == 0));
      setMoveDetails(sorted);
    }
    getMoves();
  }, []);

  return (
    <TableBody>
      {moveDetails.map((move) => (
        <MoveItem key={move.name} move={move} stab={types.filter((t) => t.type.name == move.type).length > 0} />
      ))}
    </TableBody>
  );
}

export default MovesList;

function filterMove(move: PokemonMove, index: number, array: PokemonMove[]) {
  const grp = move.version_group_details;
  for (let i = 0; i < grp.length; i++) {
    if (grp[i].version_group.name == "red-blue") return true;
  }

  return false;
}
