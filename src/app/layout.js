import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
});


export const metadata = {
  title: "Your Markdown Blog",
  description: "Simple Markdown blog created with React and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`
          ${lato} 
          ${montserrat} 
        `}
      >
        <MainHeader />
        <main className="pages-wrapper">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
