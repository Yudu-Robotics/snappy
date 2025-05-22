import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./redux/providers";

export const metadata: Metadata = {
  title: "Tinker bunker",
  description: "Tinker bunker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
