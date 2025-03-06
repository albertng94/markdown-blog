import classes from "./Footer.module.css";
import Image from "next/image";
import githubIcon from "../../../public/icons/github-dark.svg";
import { Permanent_Marker } from "next/font/google";
import Link from "next/link";

const permanentMarker = Permanent_Marker({
    subsets: ["latin"],
    weight: ["400"]
});

export default function Footer() {
    return (
        <section>
            <footer className={classes.footer}>
                <p>A project created by 
                    <span className={`${permanentMarker.className} ${classes.creator}`}> ANUGO
                        <span className={classes.secondary}>.dev</span>
                    </span>
                </p>
                <span>
                    <Link href="https://github.com/albertng94">
                        <Image 
                            alt="The GitHub logo."
                            src={githubIcon} 
                            className={classes.githubIcon}
                        />
                    </Link>
                </span>
            </footer>
        </section>
    );
}