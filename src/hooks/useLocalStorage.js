import React, { useState } from "react";

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

export default useLocalStorage;
