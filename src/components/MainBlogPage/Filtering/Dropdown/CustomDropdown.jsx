import { useState } from 'react';
import classes from './CustomDropdown.module.css';
import Image from "next/image";
import dropdownBlackIcon from "../../../../../public/icons/dropdown-black.svg";

export default function CustomDropdown({ options, defaultOption, handleClick, isOpen }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    console.log(options);

    return (
        <div className={classes.dropdown} onClick={handleClick}>
            <span className={classes.dropdownIcon}><Image 
                src={dropdownBlackIcon}
                alt="Dropdown icon" 
                width={30} 
                height={30} 
            /></span>
            <div
                className={isOpen ? `${classes.selectedOption} ${classes.focusedSelectedOption}` : classes.selectedOption}
            >
                {selectedOption}
            </div>
            {isOpen && (
                <ul className={options.includes("All posts") ? classes.threeOptionsDiv : classes.fourOptionsDiv}>
                    {options.map((option, index) => {
                        if (option === selectedOption) {
                            return null;
                        }
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelectedOption(option);
                                    handleClick();
                                }}
                                className={classes.option}
                            >
                                {option}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}