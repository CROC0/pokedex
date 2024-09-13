import type { MoveDetails } from "@/typedef/moves";

import { toTitleCase } from "@/lib/utils";
import { TableRow, TableCell } from "./ui/table";

interface props {
  move: MoveDetails;
  stab: boolean;
}

function MoveItem({ move, stab }: props) {
  return (
    <TableRow className={stab ? "font-semibold" : ""}>
      <TableCell>{toTitleCase(move.name)}</TableCell>
      <TableCell>{move.power}</TableCell>
      <TableCell>{move.accuracy}</TableCell>
      <TableCell>{toTitleCase(move.type)}</TableCell>
      <TableCell>{move.level == 0 ? "TM" : move.level}</TableCell>
    </TableRow>
  );
}

export default MoveItem;
