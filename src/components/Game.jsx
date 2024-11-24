import { useState, useEffect } from "react";
import data from "../json/gameSentences.json";
import "./Game.css"
export default function Game()
{
    
    const [collections, setCollections] = useState(data);
    const [collectionId, setCollectionId] = useState(0);



    const [button, setButton] = useState([]);
    const [randomSentence, setRandomSentence] = useState(null);
    
    const [ sentenceData, setSentenceData ] = useState(null);
    const [ sentence, setSentence ] = useState(null);

    const [showCorrectAnswerScreen, setShowCorrectAnswerScreen] = useState(false);
    const [showIncorrectAnswerScreen, setShowIncorrectAnswerScreen] = useState(false);

    useEffect(() => {
        setSentenceData({...collections[collectionId].sentences[0]});
        setSentence([...collections[collectionId].sentences[0].sentence.split(" ")]);
        setRandomSentence(addRandomOrderToSentence([...collections[collectionId].sentences[0].sentence.split(" ")]));
        let oracionDesordenada = [...collections[collectionId].sentences[0].sentence.split(" ")];       
        let idea = oracionDesordenada.map((word, index) => {
            return {
                word:word,
                id:index,
                estado:false
            }
        })
        setButton(idea);
    }, []) // tengo que hacer unos arreglo aca
    
    const addRandomOrderToSentence = (sentence) => {
        let random = [];
        const wordPool = [...sentence]
        for(let i = 0; i < sentence.length; i++){
            const randomIndex = Math.floor(Math.random() * wordPool.length);
            random.push(...wordPool.splice(randomIndex, 1));
        }
        
        return random
    }

    const tryAgain = () => {
        setShowIncorrectAnswerScreen(false);
    }
    const showIncorrectWords = (words) => {
        setShowIncorrectAnswerScreen(true);
    }
    const showCorrectAnswerResume = () => {
        console.log("respuesta correcta")
        setShowCorrectAnswerScreen(true);
    }
    
    
    const nextSentence = () => {
        const sentences = collections[collectionId].sentences;
        const indexOfCurrentSentence = sentences.findIndex(element => element.id === sentenceData.id);
        const indexOfTheNextSentence = indexOfCurrentSentence + 1;
        
        setSentenceData({...sentences[indexOfTheNextSentence]});
        setSentence([...sentences[indexOfTheNextSentence].sentence.split(" ")]);
        setShowCorrectAnswerScreen(false)
    }

    const insertWord = (e) => {
        
let idButton = e.target.getAttribute("data-id");


      let buttonState =  button.find(({id})=>{
            return id==idButton;
        })

      let newState = {...buttonState, estado:true}
      

    }

    const clearInputs = (inputs) => {// pendiente
        for(let i = 0; i < inputs.length; i++){
            inputs[i].value = "";
        }
    }

    const evalSentence = () => {
        const inputs = document.querySelectorAll(".input-word");
        const values = Array.from(inputs).map(input => input.value);
        
        clearInputs(inputs);

        const evaluation = values.map((value, index) => {
            if(value === sentence[index]){
                return true
            }
            return false
        })

        console.log(evaluation)

        const isCorrect = evaluation.every(matchWord => matchWord === true);

        if(isCorrect){
            showCorrectAnswerResume();
        }
        else {
            console.log("respuesta incorrecta")
            showIncorrectWords(evaluation);
        }
    }

    return (
        <>  
            {/* <div>
                <p> Tipos de oraciones </p>
                {collections.map(collection => {
                    return (
                        <>
                            <p> {collection.type} </p>
                            <input type="checkbox" data-type = {collection.id}></input>
                        </>
                    )
                })}
            </div> */}
               
                <div>
                    <p> Completa la oración </p>

                    {
                        !sentence ? "Cargando..." :
                        (
                            sentence.map((word, index) => 
                            {
                        
                                return (
                                    <input className="input-word" type="text" data-value={word} key={index}></input>
                                )
                            })
                        )
                    }

                    {
                        !sentence ? "Cargando..." : 
                        (randomSentence.map((word, index) => 
                        {
                            
                            return (
                                <button onClick={insertWord} className="sample-word" data-id={index} key={index}>{word}</button>
                                
                            )
                        }))
                    }

                    {
                        showCorrectAnswerScreen && (
                            <>
                                <div>
                                    <h1>Correcto</h1>
                                    <p>{`Oración : ${sentence.join(" ")}`}</p>
                                    <p>{`Traducción: ${sentenceData.translation}`}</p>
                                </div>
                                <button onClick={nextSentence}>
                                    Continuar
                                </button>
                            </>
                        )
                    }

                    {
                        showIncorrectAnswerScreen && (
                            <>
                                <div>
                                    <h1>Incorrecto</h1>
                                    <p>{`Oración : ${sentence.join(" ")}`}</p>
                                    <p>{`Traducción: ${sentenceData.translation}`}</p>
                                </div>
                                <button onClick={tryAgain}>
                                    Volver a intentar
                                </button>
                            </>
                        )
                    }
                    
                </div>
           
            
            <button onClick={evalSentence}>
                    Comprobar
            </button>
        </>
    )
}

