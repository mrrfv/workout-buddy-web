import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SettingsProvider } from "../context/SettingsContext"; // <-- import

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Workout Buddy",
  description: "Feel the burn. Don't burn your ears.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <SettingsProvider>
          <header className="bg-white dark:bg-gray-700 p-2">
            <div className="flex flex-row flex-wrap pl-8 gap-2">
              <Link href="/" className="text-lg font-bold">Workout Buddy</Link>
              <Link href={"/get-started"}>Get Started</Link>
              <Link href={"/workout"}>Work Out</Link>
              <Link href={"/settings"}>Settings</Link>
            </div>
          </header>
          <main>
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}
