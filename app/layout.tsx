import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./shared/providers/ThemeProvider";
import { SmoothScrollProvider } from "./shared/providers/SmoothScrollProvider";
import { ExperienceModeProvider } from "./shared/providers/ExperienceModeProvider";
import Header from "./shared/layout/Header";
import Footer from "./shared/layout/Footer";
import { getPortfolioData } from "@/lib/portfolio";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { personal } = getPortfolioData();

export const metadata: Metadata = {
  title: {
    default: personal.name,
    template: `%s | ${personal.name}`,
  },
  description: personal.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SmoothScrollProvider>
            <ExperienceModeProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ExperienceModeProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
