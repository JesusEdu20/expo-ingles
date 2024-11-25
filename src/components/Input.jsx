import { useState, useEffect } from "react";
import data from "../json/gameSentences.json";
import "./Input.css"
function Input({ value,onChange, estado }) {
    const estados = {
        sinUsar: 'gray',
        colocado: 'green',
        mal: 'red'
      };
  return (
    <input
      type="text"
      onClick={onChange}
      onChange={(e) => setInputValue(e.target.value)}
      className={`input ${estados[estado]}`}
      value={value}
    />
  );
}

export default Input;