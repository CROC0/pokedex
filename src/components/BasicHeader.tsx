import Link from "next/link";

function BasicHeader() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between h-10">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          Pokédex
        </Link>
      </div>
    </header>
  );
}

export default BasicHeader;
