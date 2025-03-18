"use client"

import classes from "./error.module.css";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className={classes.error}>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="100"  height="100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
            <h3>An unexpected error ocurred!</h3>
            <Link className={classes.backTo} href="/">
                <span class="material-icons">keyboard_return</span>
                <h4>Please go back to the main page</h4>
            </Link>
        </div>
    );
}