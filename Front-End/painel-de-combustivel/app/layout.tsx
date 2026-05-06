import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Market Panel",
  description: "Painel de Preços de Combustíveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">

          <aside className="w-64 md:border-r border-b md:border-b-3 border-zinc-800 p-6 flex flex-col gap-8">
            <h2 className="text-xl font-bold bg-blue-600 from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Market Panel
            </h2>

            <nav className="grid grid-cols-1 gap-2 p-4 md:grid-cols-1 md:flex md:flex-col">

              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>

              <Link href="/produtos" className="hover:text-blue-400 transition-colors">
                Produtos
              </Link>

              <Link href="/fornecedores" className="hover:text-blue-400 transition-colors">
                Fornecedores
              </Link>

              <Link href="/lancarPrecos" className="hover:text-blue-400 transition-colors">
                Lançar Preços
              </Link>

            </nav>

          </aside>

          <main className="flex-1 p-8 md:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}