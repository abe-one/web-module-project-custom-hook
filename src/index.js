import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

// update state updates storage
// Parse JSON?
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key);
      // If the key exists in localStorage then set the key's value to state
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
      // If not save the key:initialValue to storage and set to state
    } //storedValue state
  });

  const setLocalStoredValue = (storedValue) => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
    setStoredValue(storedValue);
  };

  return [storedValue, setLocalStoredValue];
};

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [testRun, setTestRun] = useLocalStorage("nothing", "I added this");

  useEffect(() => {
    console.log(testRun);
    setTestRun("Changed it?");
    console.log(testRun);
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
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
