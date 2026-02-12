import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";

export const metadata: Metadata = {
  title: "Rajat Aswani | Portfolio",
  description: "Computer Engineering Student | Blockchain Enthusiast | Problem Solver",
  keywords: ["Rajat Aswani", "Portfolio", "Computer Engineering", "Blockchain", "Web Developer"],
  authors: [{ name: "Rajat Aswani" }],
  openGraph: {
    title: "Rajat Aswani | Portfolio",
    description: "Computer Engineering Student | Blockchain Enthusiast | Problem Solver",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
