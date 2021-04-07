import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import useDarkMode from "./hooks/useDarkMode";

import "./styles.scss";

// const useDarkMode = (initialBoolean) => {
//   const [darkMode, setDarkMode] = useLocalStorage("localDark", initialBoolean);

//   const setBodyDarkMode = (newBoolean) => {
//     setDarkMode(newBoolean);
//     if (newBoolean) {
//       return document.querySelector("body").classList.add("dark-mode");
//     } //else for readability?
//     return document.querySelector("body").classList.remove("dark-mode");
//   };
//   return [darkMode, setBodyDarkMode];
// };

const App = () => {
  const [coinData, setCoinData] = useState([]);
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
    <div className={bodyDark ? "dark-mode App" : "App"}>
      <Navbar darkMode={bodyDark} setDarkMode={setBodyDark} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
