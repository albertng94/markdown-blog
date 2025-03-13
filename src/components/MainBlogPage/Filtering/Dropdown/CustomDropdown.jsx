import { useState } from 'react';
import classes from './CustomDropdown.module.css';
import Image from "next/image";
import dropdownBlackIcon from "../../../../../public/icons/dropdown-black.svg";

export default function CustomDropdown({ options, defaultOption, handleClick, isOpen, handleFiltering }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    return (
        <div className={isOpen ? `${classes.selectedOption} ${classes.focusedSelectedOption}` : classes.selectedOption} onClick={handleClick}>
            <span className={classes.dropdownIcon}><Image 
                src={dropdownBlackIcon}
                alt="Dropdown icon" 
                width={30} 
                height={30} 
            /></span>
            <div>
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
                                    handleFiltering(option);
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