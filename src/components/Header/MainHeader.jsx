import { RiMarkdownLine } from "react-icons/ri";
import classes from "./MainHeader.module.css";
import NavItem from "./NavItem";
import NavLink from "./HeaderLink";

export default function MainHeader() {
    return (
        <header className={classes.header}>
                <div className={classes.logoDiv}>
                    <RiMarkdownLine className={classes.logo} />
                    <h1 className={classes.title}>A Simple<br/>Markdown<br/>Blog</h1>
                </div>
                
                <nav className={classes.nav}>
                    <ul>
                        <NavLink href="/">
                            <NavItem>About</NavItem>
                        </NavLink>
                        <NavLink href="/blog">
                            <NavItem>Blog</NavItem>
                        </NavLink>
                    </ul>
                </nav>
                
        </header>
    );
}