import { useState, useEffect } from "react";
import data from "../json/gameSentences.json";
import "./Button.css"
function Button({ palabra, onClick, estado }) {
    const estados = {
      sinUsar: 'gray',
      colocado: 'green',
      mal: 'red'
    };
  
    return (
      <button
        className={`button ${estados[estado]}`}
        onClick={onClick}
      >
        {palabra}
      </button>
    );
  }
  export default Button;