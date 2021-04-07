import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
      // If the key exists in localStorage then set the key's value to state
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
      // If not save the key:initialValue to storage and set to state
    } //storedValue state
  });

  const setLocalStoredValue = (newStoredValue) => {
    window.localStorage.setItem(key, JSON.stringify(newStoredValue));
    setStoredValue(newStoredValue);
  };

  return [storedValue, setLocalStoredValue];
}; //useLocalStorage

const useDarkMode = (initialBoolean) => {
  const [darkMode, setDarkMode] = useState(initialBoolean);

  const setBodyDarkMode = (newBoolean) => {
    setDarkMode(newBoolean);
    if (newBoolean) {
      return document.querySelector("body").classList.add("dark-mode");
    }
    return document.querySelector("body").classList.remove("dark-mode");
  };
  return [darkMode, setBodyDarkMode];
};

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [bodyDark, setBodyDark] = useDarkMode(false);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then((res) => setCoinData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <button onClick={(_) => setBodyDark(!bodyDark)}>Body Dark</button>
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
