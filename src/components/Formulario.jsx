import React, { useEffect, useState } from 'react'
import preguntas from '../../public/Preguntas/generales.json'

function Formulario () {
  const [respuestas, setRespuestas] = useState({})
  const [puntuacion, setPuntuacion] = useState(0)
  const [apto, setApto] = useState(false)
  const [terminado, setTerminado] = useState(false)
  const [porcentajeAcertado, setPorcentajeAcertado] = useState(0)

  const [startTime] = useState(performance.now())
  const [endTime, setEndTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const [checkboxValues, setCheckboxValues] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    let puntaje = 0
    preguntas.preguntas.forEach((pregunta, index) => {
      if (pregunta.respuestaCorrecta === respuestas[index].join('')) {
        // document.getElementsByTagName('p')[index].style.backgroundColor = 'green'
        puntaje++
      } else {
        // document.getElementsByTagName('p')[index].style.backgroundColor = 'red'
      }
    })
    setPuntuacion(puntaje)
    setPorcentajeAcertado(Math.round((puntaje / preguntas.preguntas.length) * 100) / 100)
    setTerminado(true)
    setEndTime(performance.now())
    // setElapsedTime(endTime - startTime)
  }

  const handleChange = (event) => {
    const { name, value, checked } = event.target
    const index = parseInt(name)
    setRespuestas((prevRespuestas) => {
      const preguntaRespuestas = prevRespuestas[index] || []
      let nuevasRespuestas
      if (checked) {
        nuevasRespuestas = [...preguntaRespuestas, value]
      } else {
        nuevasRespuestas = preguntaRespuestas.filter((r) => r !== value)
      }
      return {
        ...prevRespuestas,
        [index]: nuevasRespuestas
      }
    })
    // Limitar a 1 respuesta por pregunta con 4 opciones
    // if (respuestas[index].length > 1) {
    //   respuestas[index].shift()
    // }
    // Desmarcar el resto de checkboxes para preguntas con 4 opciones
    // const checkboxes = document.getElementsByName(index)
    // for (let i = 0; i < checkboxes.length; i++) {
    //   if (checkboxes[i].value !== value) {
    //     checkboxes[i].checked = false
    //     console.log('checkboxes[i]: ', checkboxes[i].checked)
    //   }
    // }
    handleCheckboxChange(event)
  }

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target
    setCheckboxValues({ [name]: value }) // actualiza solo el checkbox seleccionado
  }

  useEffect(() => {
    setElapsedTime(endTime - startTime)
  }, [endTime])

  useEffect(() => {
    if (porcentajeAcertado >= 0.72) {
      setApto(true)
    }
  }, [porcentajeAcertado])

  // function getChecked (index) {
  //   console.log('getChecked; ', index)
  //   const selectedAnswers = respuestas[index] || []
  //   const numSelectedAnswers = selectedAnswers.length
  //   if (numSelectedAnswers === 1 || numSelectedAnswers === 2 || numSelectedAnswers === 3) {
  //     return true
  //   }
  //   return false
  // }
  // const getChecked = (index, value) => {
  //   const checksPorPregunta = respuestas[index] || []
  //   return checksPorPregunta.includes(value)
  // }

  return (
    <div>
      <h1>Quizzes AWS</h1>
      <form onSubmit={handleSubmit}>
        {preguntas.preguntas.map((pregunta, index) => (
          <div key={index}>
            <h3>{pregunta.enunciado}</h3>
            <label>
              <input
                type='checkbox'
                name={index}
                value='1'
                onChange={handleChange}
                disabled={terminado}
                checked={checkboxValues[index] === '1'}
              />
              {pregunta.respuesta1}
              <br />
            </label>
            <label>
              <input
                type='checkbox'
                name={index}
                value='2'
                onChange={handleChange}
                disabled={terminado}
                checked={respuestas[index]?.includes('2')}
              />
              {pregunta.respuesta2}
            </label>
            <br />
            <label>
              <input
                type='checkbox'
                name={index}
                value='3'
                onChange={handleChange}
                disabled={terminado}
                checked={respuestas[index]?.includes('3')}
              />
              {pregunta.respuesta3}
              <br />
            </label>
            <label>
              <input
                type='checkbox'
                name={index}
                value='4'
                onChange={handleChange}
                disabled={terminado}
                checked={respuestas[index]?.includes('4')}
              />
              {pregunta.respuesta4}
              <br />
            </label>
            {pregunta.respuesta5 &&
              <label>
                <input
                  type='checkbox'
                  name={index}
                  value='5'
                  onChange={handleChange}
                  disabled={terminado}
                  checked={respuestas[index]?.includes('5')}
                />
                {pregunta.respuesta5}
                <br />
              </label>}
            {pregunta.respuesta6 &&
              <label>
                <input
                  type='checkbox'
                  name={index}
                  value='6'
                  onChange={handleChange}
                  disabled={terminado}
                  checked={respuestas[index]?.includes('6')}
                />
                {pregunta.respuesta6}
                <br />
              </label>}
          </div>
        ))}
        {!terminado && <button type='submit'>Enviar</button>}
      </form>
      {terminado && <h1>Estadísticas: {apto ? (<h2>APTO</h2>) : (<h2>NO APTO</h2>)}</h1>}
      {terminado && <p>Has acertado: {puntuacion}</p>}
      {terminado && <p>Has fallado: {preguntas.preguntas.length - puntuacion}</p>}
      {terminado && <p>Has acertado el {porcentajeAcertado * 100}% de las preguntas (+72% para APTO)</p>}
      {terminado && porcentajeAcertado < 0.72 && <p>Necesitas un: +{(72 - porcentajeAcertado * 100)}% para el APTO</p>}
      {terminado && <p>Tiempo empleado: {Math.round((elapsedTime / 60000) * 100) / 100} minutos</p>}
      {terminado && <p>Tiempo medio por pregunta: {Math.round((elapsedTime / 60000 / preguntas.preguntas.length) * 100) / 100} minutos</p>}
    </div>
  )
}

export default Formulario
