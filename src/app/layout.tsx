import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "../styles/globals.css"
import { theme } from "@/styles/theme";

export const metadata: Metadata = {
  title: "DNC - hotel",
  description: "Generated by DDR23",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
