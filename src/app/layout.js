import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import MainHeader from "../components/Header/MainHeader";
import Footer from "../components/Footer/Footer";
import ModeToggle from "../components/ModeToggle/ModeToggle";


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
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" precedence="default"></link>
      <body 
        className={`
          ${lato} 
          ${montserrat} 
        `}
      >
        <ModeToggle />
        <MainHeader />
        <main className="pages-wrapper">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
