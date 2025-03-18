"use client"

import Image from "next/image";
import darkModeIcon from "../../../public/icons/dark-mode.svg";
import lightModeIcon from "../../../public/icons/light-mode.svg";
import classes from "./ModeToggle.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

function addDarkMode() {
    document.querySelector("body").setAttribute("data-theme", "dark");
}

function addLightMode() {
    document.querySelector("body").setAttribute("data-theme", "light");
}

export default function ModeToggle() {

    const [darkMode, setDarkMode] = useState(true);

    function handleModeToggle() {
        if (darkMode) {
            addDarkMode();
        } else {
            addLightMode();
        }

        setDarkMode((prevMode) => !prevMode);
    }

    return (
        <motion.div 
            className={classes.modeToggle} 
            onClick={handleModeToggle}
            whileHover={{width: 115}}
        >
            <Image
                src={darkMode ? darkModeIcon : lightModeIcon}
                alt={darkMode ? "A moon icon representing the dark-mode option" : "A sun icon representing the light-mode option"} 
                className={classes.modeIcon}
                width={25}
            />
            <span>{darkMode ? "dark-mode" : "light-mode"}</span>
        </motion.div>
    );
}