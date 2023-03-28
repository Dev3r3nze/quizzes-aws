import React from 'react'

function Configurador (props) {
  function handleRenderizado () {
    props.setConfigurado(true)
  }

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
      <select>
        <option value='1'>30</option>
        <option value='2'>65</option>
        <option value='3'>130</option>
      </select>
      <br />
      <button onClick={handleRenderizado}>Empezar</button>
    </div>
  )
}

export default Configurador
