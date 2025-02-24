import { RiMarkdownLine } from "react-icons/ri";
import classes from "./MainHeader.module.css";
import NavItem from "./NavItem";
import Link from "next/link";

export default function MainHeader() {
    return (
        <header className={classes.header}>
                <div className={classes.logoDiv}>
                    <RiMarkdownLine fontSize={100} />
                    <h1 className={classes.title}>Your<br/>Markdown<br/>Blog</h1>
                </div>
                
                    <nav className={classes.nav}>
                        <ul>
                            <NavItem>
                                <Link href="/">All Posts</Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/new-post">Create<br/>New Post</Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/drafts">Your<br/>Drafts</Link>
                            </NavItem>
                            <NavItem>Dark<br/>Mode</NavItem>
                        </ul>
                    </nav>
                
        </header>
    );
}