import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PokeContainer from "@/components/PokeContainer";

interface props {
  searchParams: {
    o: string;
  };
}

export default function Page({ searchParams }: props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40 py-8">
        <PokeContainer offset={Number(searchParams.o ?? 0)} />
      </main>
      <Footer />
    </div>
  );
}
