import "./globals.css";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body suppressHydrationWarning={true} className="bg-black text-white antialiased">
                {children}
            </body>
        </html>
    );
}
