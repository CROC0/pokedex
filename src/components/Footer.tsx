import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">&copy; 2023 Pokédex. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
