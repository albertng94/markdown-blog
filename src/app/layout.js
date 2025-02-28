import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/Header/MainHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your Markdown Blog",
  description: "Simple Markdown blog created with React and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainHeader />
        <div className="pages-wrapper">
          {children}
        </div>
        {/* MainFooter component */}
      </body>
    </html>
  );
}
