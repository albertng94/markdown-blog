import { useState } from 'react';
import classes from './CustomDropdown.module.css';
import Image from "next/image";
import dropdownBlackIcon from "../../../../../public/icons/dropdown-black.svg";
import dropdownWhiteIcon from "../../../../../public/icons/dropdown-white.svg";
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomDropdown({ options, defaultOption, handleClick, isOpen, handleFiltering }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    return (
        <div className={isOpen ? `${classes.selectedOption} ${classes.focusedSelectedOption}` : classes.selectedOption} onClick={handleClick}>
            <motion.span
                animate={{rotate: isOpen ? 180 : 0, y: isOpen ? -5 : 0}} 
                className={classes.dropdownIcon}
            >
                <Image 
                    src={isOpen ? dropdownWhiteIcon : dropdownBlackIcon}
                    alt="Dropdown icon" 
                    width={30} 
                    height={30} 
                />
            </motion.span>
            <div>
                {selectedOption}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul 
                        className={options.includes("All posts") ? classes.threeOptionsDiv : classes.fourOptionsDiv}
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                    >
                        {options.map((option, index) => {
                            if (option === selectedOption) {
                                return null;
                            }
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedOption(option);
                                        handleFiltering(option);
                                        handleClick();
                                    }}
                                    className={classes.option}
                                >
                                    {option}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}