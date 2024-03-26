import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kusuma Bloom",
  description: "Kusuma Bloom parent layout",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/images/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/images/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/images/favicon/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      url: "/images/favicon/site.webmanifest",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </NextAuthProvider>
      </body>
    </html>
  );
}
