import Link from "next/link";
import { Input } from "./ui/input";
import SearchIcon from "./icon/search";

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          Pokédex
        </Link>
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
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
