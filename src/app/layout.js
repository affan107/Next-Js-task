import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Vox Works",
  icons: {
    icon: "/logo.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
