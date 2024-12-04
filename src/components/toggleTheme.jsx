import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import "../DarkMode.css";

const ToogleTheme = (props) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
      });
    
      useEffect(() => {
        localStorage.setItem("theme", theme);
      }, [theme]);
    
      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };

    return (
        <>
         <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={theme === "dark"}
                onChange={(e)=> toggleTheme(e)}
                
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
        </>
       
    );
}

export default ToogleTheme;