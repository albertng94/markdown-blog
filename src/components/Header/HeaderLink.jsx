"use client"
import classes from "./HeaderLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({href, children}) {

    const path = usePathname();

    return (
        <Link href={href} className={path === href ? `${classes.headerLink} ${classes.active}` : `${classes.headerLink}`}>
            {children}
        </Link>
    );
}