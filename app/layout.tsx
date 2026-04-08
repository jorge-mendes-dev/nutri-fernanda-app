import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutri Fernanda",
  description: "Aplicativo de nutrição da Fernanda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
