import type { Metadata } from "next";
import { Press_Start_2P, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import GameBackground from "@/components/GameBackground";

// Pixel font: só para logo e títulos grandes (identidade de game dev)
const press = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
  display: "swap",
});

// Texto corrido
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Menus e navegação
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hak | Desenvolvedor de Jogos",
  description:
    "Portfólio do Hak, desenvolvedor júnior de jogos. Projetos, game jams e um pouco da minha história.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${press.variable} ${sora.variable} ${grotesk.variable}`}
    >
      <body>
        <GameBackground />
        {children}
      </body>
    </html>
  );
}