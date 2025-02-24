import classes from "./NavItem.module.css";

export default function NavItem({ children }) {
    return (
        <li className={classes.navItem}>
            <p>
                {children}
            </p>
        </li>
    )
}