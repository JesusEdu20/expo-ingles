

import React, { useState, useEffect } from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import oraciones from "../json/sentencesGame.json";
import "./Iagame.css"

export default function Iagame() {
  const [oracionActual, setOracionActual] = useState('');
  const [palabras, setPalabras] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [palabraSeleccionada, setPalabraSeleccionada] = useState(null);
  const [sentence, setSentence]= useState(null);

  const [showCorrectAnswerScreen, setShowCorrectAnswerScreen] = useState(false);
  const [showIncorrectAnswerScreen, setShowIncorrectAnswerScreen] = useState(false);
  const [show, setShow] = useState(true);

  
    

  useEffect(() => {
    // Seleccionar una oración aleatoria al cargar la página
    const nuevaOracion = oraciones[Math.floor(Math.random() * oraciones.length)];

    setOracionActual(nuevaOracion);
    setSentence(nuevaOracion.split(' '))

    setPalabras(addRandomOrderToSentence(nuevaOracion.split(" ")).map(palabra => ({
        texto: palabra,
        seleccionado: false
      })));

    setInputs(nuevaOracion.split(' ').map(palabra => ({
        value:palabra,
        texto: "",
        seleccionado: false
      })));
  }, []);

  const addRandomOrderToSentence = (sentence) => {
    let random = [];
    const wordPool = [...sentence]
    for(let i = 0; i < sentence.length; i++){
        const randomIndex = Math.floor(Math.random() * wordPool.length);
        random.push(...wordPool.splice(randomIndex, 1));
    }
    
    return random
  }

  const nextSentence = () =>{
    const nuevaOracion = oraciones[Math.floor(Math.random() * oraciones.length)];
    setOracionActual(nuevaOracion);
    setSentence(nuevaOracion.split(' '))
    setPalabras(nuevaOracion.split(' ').map(palabra => ({
        texto: palabra,
        seleccionado: false
      })));
    setInputs(nuevaOracion.split(' ').map(palabra => ({
        value:palabra,
        texto: "",
        seleccionado: false
      })));
      setShowCorrectAnswerScreen(false);
      setShow(true);

  }

  const tryAgain = () => {
    const inputs = document.querySelectorAll(".input");
    clearInputs(inputs);
    setShowIncorrectAnswerScreen(false);
    setShow(true);
}

  const showIncorrectWords = (words) => {
    setShowIncorrectAnswerScreen(true);
}
const showCorrectAnswerResume = () => {
    console.log("respuesta correcta")
    setShowCorrectAnswerScreen(true);
}

  const handleButtonClick = (index) => {
    //guarda la palabra segun el boton en otro estado
    setPalabraSeleccionada(palabras[index].texto)
    // cambia el estado del boton para manipular el css 
    setPalabras(palabras.map((palabra, i) => ({
      ...palabra,
      seleccionado: i === index
    })));
    
    console.log("la palabras seleccionada es: " + palabraSeleccionada)
    
  };

  const handleInputChange = (index) => {
//cambia el estado de los input cambiando el texto del input seleccionado
    setInputs(inputs.map((input, i) =>
        i === index ? { ...input, texto: palabraSeleccionada } : input
      ));
   
  };

  const clearInputs = (inputs) => {// pendiente

    setInputs(oracionActual.split(' ').map(palabra => ({
        value:palabra,
        texto: "",
        seleccionado: false
      })));
}

  const comprobarOracion = () => {
    // Lógica para comprobar si la oración reconstruida es correcta
    const inputs = document.querySelectorAll(".input");
    const values = Array.from(inputs).map(input => input.value);
    console.log(values)
    console.log(sentence)

    const evaluation = values.map((value, index) => {
        if(value === sentence[index]){
            return true
        }
        return false
    })

    setShow(false);
    

    const isCorrect = evaluation.every(matchWord => matchWord === true);
    console.log(isCorrect)

    if(isCorrect){
      showCorrectAnswerResume();

  }
  else {
      console.log("respuesta incorrecta")
      showIncorrectWords(evaluation);
  }

  };
  return (
    <div className='general-container'>
        

       <div className='general'>
       <h1 className='title'> Complete la oración con las palabras a continuación </h1>
        <div className="button-container">
        {palabras.map((palabra, index) => (
       
       <Button
         key={index}
         palabra={palabra.texto}
         onClick={() => {
           handleButtonClick(index);
   
       }}
         estado={palabra.seleccionado ? 'colocado' : 'sinUsar'}
       />
     ))}
        </div>
      
        <div className="input-container">
      {inputs.map((input, index) => (
        <Input
          key={index}
          value={input.texto}
          estado={input.seleccionado ? 'colocado' : 'sinUsar'}
          onChange={() => handleInputChange(index)}
        
        />
      ))}
      </div>

      <div className="control-container">
      {
                        showCorrectAnswerScreen && (
                            <>
                                <div>
                                    <h1>Correcto</h1>
                                    <p>{`Oración : ${sentence.join(" ")}`}</p>
                                    
                                </div>
                                <button className='button' onClick={nextSentence} >
                                    Continuar
                                </button>
                            </>
                        )
                    }

                    {
                        showIncorrectAnswerScreen && (
                            <>
                                <div>
                                    <h1 className='red'>Incorrecto</h1>
                                    
                            
                                </div>
                                <button className='button' onClick={tryAgain} >
                                    Volver a intentar
                                </button>
                            </>
                        )
                    }
                    {
                      show && (
<button className="button" onClick={comprobarOracion}>Comprobar</button>
                      )
                    }
      
      </div>
    </div>
    </div>
  );
}