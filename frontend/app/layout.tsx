import Header from "@/components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthCheckerWrapper from "@/components/AuthCheckerWrapper";
import Link from "next/link";

config.autoAddCss = false;
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
        <AuthCheckerWrapper>
          <Header />
          {children}
        </AuthCheckerWrapper>
      </body>
    </html>
  );
}
