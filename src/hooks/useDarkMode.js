import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = (initialBoolean) => {
  const [darkMode, setDarkMode] = useLocalStorage("localDark", initialBoolean);

  const setBodyDarkMode = (newBoolean) => {
    setDarkMode(newBoolean);
    if (newBoolean) {
      return document.querySelector("body").classList.add("dark-mode");
    } else {
      return document.querySelector("body").classList.remove("dark-mode");
    }
  };
  return [darkMode, setBodyDarkMode];
};

export default useDarkMode;
