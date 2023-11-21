import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollectionApp",
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} duration-300 min-h-screen`}>
          {children}
      </body>
    </html>
  );
}
