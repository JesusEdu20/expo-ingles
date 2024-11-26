import { useState, useEffect } from "react";
import collectionOfSentence from "../json/activeAndPasive.json";
import "./closingGame.css"
export function ClosingGame () {

    const [ sentence, setSentence ] =  useState("text");
   
    useEffect(() => {
        selectRandomSentence();
    }, 
    [])

    const selectRandomSentence = () => {
        const random = [];
        const sentencePull = [...collectionOfSentence];
        const randomIndex = Math.floor(Math.random() * sentencePull.length);
        const sentenceSelected = sentencePull.splice(randomIndex, 1);
        setSentence(...sentenceSelected)
       
    }

    const nextSentence = () => {
        selectRandomSentence()
    }
   
    return (
        <div className="closing-game-container" style={{ backgroundColor: sentence.type === "passive" ? "#84b6f4" : "#77dd77" }}>
            <div>
                <p>
                    {sentence.text}
                </p>
            </div>
            <input className="closing-game-container__input-btn" type="button" value="siguiente" onClick={nextSentence} />
        </div>

    )
}