import React, { useState } from 'react'
import Formulario from './FormularioCompo'

function Configurador () {
  const [configurado, setConfigurado] = useState(false)
  const [numPreguntas, setNumPreguntas] = useState(4) // Definir variable de estado para el número de preguntas

  function handleRenderizado () {
    setConfigurado(true)
  }

  function handleNumPreguntas (event) {
    setNumPreguntas(Number(event.target.value)) // Actualizar variable de estado con el número de preguntas seleccionado
  }

  if (!configurado) {
    return (
      <div>
        <h1>Quizzes AWS</h1>
        <p>Selecciona un tema</p>
        <select>
          <option value='1'>General</option>
          <option value='2'>S3</option>
          <option value='3'>IAM</option>
        </select>
        <p>Selecciona el número de preguntas</p>
        <select onChange={handleNumPreguntas} value={65}> {/* Agregar evento onChange para actualizar el estado con el número de preguntas seleccionado */}
          <option value='33'>33</option>
          <option value='65'>65</option>
          <option value='130'>130</option>
        </select>
        <br />
        <button onClick={handleRenderizado}>Empezar</button>
      </div>
    )
  } else {
    return (
      <Formulario numPreguntas={numPreguntas} /> // Pasar el número de preguntas seleccionado como prop al componente Formulario
    )
  }
}

export default Configurador
