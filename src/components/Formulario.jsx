import React, { useState } from 'react'
import preguntas from '../../public/Preguntas/S3.json'

function Formulario () {
  const [respuestas, setRespuestas] = useState([])
  const [puntuacion, setPuntuacion] = useState(0)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5173/public/Preguntas/S3.json')
  //       const data = await response.json()
  //       setPreguntas(data.preguntas)
  //     } catch (error) {
  //       console.log('Error al cargar el archivo JSON:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let puntaje = 0
    preguntas.preguntas.forEach((pregunta, index) => {
      if (pregunta.respuestaCorrecta === respuestas[index]) {
        puntaje++
      }
    })
    setPuntuacion(puntaje)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const newRespuestas = [...respuestas]
    newRespuestas[name] = value
    setRespuestas(newRespuestas)
  }

  return (
    <div>
      <h1>Quizzes AWS</h1>

      <form onSubmit={handleSubmit}>
        {preguntas.preguntas.map((pregunta, index) => (
          <div key={index}>
            <p>{pregunta.enunciado}</p>
            <label>
              <input
                type='radio'
                name={index}
                value='1'
                onChange={handleChange}
              />
              {pregunta.respuesta1}
            </label>
            <label>
              <input
                type='radio'
                name={index}
                value='2'
                onChange={handleChange}
              />
              {pregunta.respuesta2}
            </label>
            <label>
              <input
                type='radio'
                name={index}
                value='3'
                onChange={handleChange}
              />
              {pregunta.respuesta3}
            </label>
            <label>
              <input
                type='radio'
                name={index}
                value='4'
                onChange={handleChange}
              />
              {pregunta.respuesta4}
            </label>
          </div>
        ))}
        <button type='submit'>Enviar respuestas</button>
      </form>
      {puntuacion > 0 && <p>Tu puntuación es: {puntuacion}</p>}
    </div>
  )
}

export default Formulario
