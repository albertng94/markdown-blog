"use client"

import classes from "./error.module.css";
import Image from "next/image";
import errorIcon from "../../public/icons/error-black.svg";
import backIcon from "../../public/icons/backIcon.svg";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className={classes.error}>
            <Image 
                src={errorIcon}
                alt="An alert icon." 
                width={100} 
                height={100}
            />
            <h3>An unexpected error ocurred!</h3>
            <Link className={classes.backTo} href="/">
                <Image 
                    alt="An icon representing an arrow to the left." 
                    src={backIcon}
                />
                <h4>Please go back to the main page</h4>
            </Link>
        </div>
    );
}