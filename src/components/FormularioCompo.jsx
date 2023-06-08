import React, { useEffect, useState } from 'react'
import shuffle from 'lodash.shuffle'

import preguntas from '../../public/Preguntas/generales.json'

function Formulario (props) {
  const [respuestas, setRespuestas] = useState(preguntas.preguntas.map(() => []))
  const [puntuacion, setPuntuacion] = useState(0)
  const [apto, setApto] = useState(false)
  const [terminado, setTerminado] = useState(false)
  const [porcentajeAcertado, setPorcentajeAcertado] = useState(0)
  const [preguntasAleatorias, setPreguntasAleatorias] = useState([])
  const [startTime, setStartTime] = useState(performance.now())
  const [endTime, setEndTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([])

  const localStorage = window.localStorage

  // const { globalState, setGlobalState } = useContext(MyContext)

  useEffect(() => {
    if (preguntasAleatorias.length === 0) {
      const preguntasAleatorias = shuffle(preguntas.preguntas).slice(0, props.numPreguntas)
      setPreguntasAleatorias(preguntasAleatorias)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let puntaje = 0
    console.log(respuestasSeleccionadas.length)
    if (respuestasSeleccionadas.length < props.numPreguntas) {
      window.alert('Debe seleccionar al menos una respuesta en cada pregunta')
      return
    }
    const preguntasRenderizadas = preguntasAleatorias.slice(0, props.numPreguntas)

    preguntasRenderizadas.forEach((pregunta, index) => {
      const labels = document.querySelectorAll(`.pregunta-${index + 1} label`)

      if (pregunta.respuestaCorrecta.length > 1) {
        pregunta.respuestaCorrecta.sort((a, b) => a - b)
        if (pregunta.respuestaCorrecta.join('') === respuestas[index].join('')) {
          puntaje++
          pregunta.respuestaCorrecta.forEach(respuesta => {
            labels[respuesta - 1].classList.add('respuesta-correcta')
          })
        } else {
          respuestas[index].forEach(respuesta => {
            labels[respuesta - 1].classList.add('respuesta-incorrecta')
          })

          pregunta.respuestaCorrecta.forEach(respuesta => {
            labels[respuesta - 1].classList.remove('respuesta-incorrecta')
            labels[respuesta - 1].classList.add('respuesta-correcta')
          })
        }
      } else if (pregunta.respuestaCorrecta === respuestas[index].join('')) {
        puntaje++
        labels[pregunta.respuestaCorrecta - 1].classList.add('respuesta-correcta')
      } else {
        labels[respuestas[index] - 1].classList.add('respuesta-incorrecta')
        labels[pregunta.respuestaCorrecta - 1].classList.add('respuesta-correcta')
      }
    })

    setPuntuacion(puntaje)
    setPorcentajeAcertado(
      Math.round((puntaje / props.numPreguntas) * 100) / 100
    )
    setTerminado(true)
    setEndTime(performance.now())
    // setElapsedTime(endTime - startTime)
  }

  const handleChange = (event) => {
    const nuevasRespuestas = [...respuestas]

    const { name, value } = event.target
    const preguntaIndex = Number(name.split('-')[0])
    const pregunta = preguntasAleatorias[preguntaIndex]
    const numRespuestasPermitidas = pregunta.respuesta6 ? 3 : pregunta.respuesta5 ? 2 : 1
    const respuestasPregunta = respuestas[preguntaIndex]

    if (!respuestasPregunta.includes(value)) {
      if (respuestasPregunta.length >= numRespuestasPermitidas) {
        respuestasPregunta.shift()
      }
      respuestasPregunta.push(value)
    } else {
      const index = respuestasPregunta.indexOf(value)
      respuestasPregunta.splice(index, 1)
    }

    setRespuestas((prevRespuestas) => {
      const newRespuestas = [...prevRespuestas]
      newRespuestas[preguntaIndex] = respuestasPregunta
      return newRespuestas
    })

    if (numRespuestasPermitidas === 1) {
      const checkboxes = event.target.parentNode.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach((checkbox) => {
        if (checkbox !== event.target) {
          checkbox.checked = false
        }
      })
    }
    const nuevasRespuestasSeleccionadas = nuevasRespuestas
      .map((respuestas, index) => respuestas.length > 0 ? index : null)
      .filter((index) => index !== null)
    setRespuestasSeleccionadas(nuevasRespuestasSeleccionadas)
  }

  useEffect(() => {
    setElapsedTime(endTime - startTime)
  }, [endTime])

  useEffect(() => {
    if (porcentajeAcertado >= 0.72) {
      setApto(true)
    }
  }, [porcentajeAcertado])

  const handleReset = () => {
    setTerminado(false)
    setRespuestas(preguntas.preguntas.map(() => []))
    setPuntuacion(0)
    setApto(false)
    setPorcentajeAcertado(0)
    setEndTime(0)
    setElapsedTime(0)
    setStartTime(performance.now())
    document.querySelectorAll('.respuesta-correcta').forEach((element) => {
      element.classList.remove('respuesta-correcta')
    })
    document.querySelectorAll('.respuesta-incorrecta').forEach((element) => {
      element.classList.remove('respuesta-incorrecta')
    })
    respuestas.forEach((respuesta) => {
      respuesta.splice(0, respuesta.length)
    })
    const preguntasAleatorias = shuffle(preguntas.preguntas).slice(0, props.numPreguntas)
    setPreguntasAleatorias(preguntasAleatorias)

    // Enviar datos a Stats
    // const data = {
    //   tiempo: elapsedTime,
    //   puntuacion,
    //   numPreguntas: props.numPreguntas,
    //   aptos: apto ? 1 : 0,
    //   examen: terminado ? 1 : 0
    // }
    // props.actualizarData({ ...props.data, ...data })
    // setGlobalState({
    //   ...globalState,
    //   tiempo: elapsedTime,
    //   aciertos: puntuacion,
    //   preguntas: props.numPreguntas,
    //   aptos: apto ? 1 : 0,
    //   examen: terminado ? 1 : 0
    // })
    actualizarEstadisticas(elapsedTime, puntuacion, props.numPreguntas, apto, terminado)
  }

  const actualizarEstadisticas = (elapsedTime, puntuacion, numPreguntas, apto, terminado) => {
    // Obtener las estadísticas anteriores del LocalStorage
    const estadisticasAnteriores = JSON.parse(localStorage.getItem('estadisticas')) || { tiempoTotal: 0, aciertosTotales: 0, aptosTotales: 0, preguntasTotales: 0, examenesTotales: 0 }

    // Agregar los nuevos datos a las estadísticas anteriores
    const estadisticasNuevas = {
      tiempoTotal: estadisticasAnteriores.tiempoTotal + elapsedTime,
      aciertosTotales: estadisticasAnteriores.aciertosTotales + puntuacion,
      preguntasTotales: estadisticasAnteriores.preguntasTotales + numPreguntas,
      aptosTotales: estadisticasAnteriores.aptosTotales + (apto ? 1 : 0),
      examenesTotales: estadisticasAnteriores.examenesTotales + (terminado ? 1 : 0)
    }
    console.log(apto)

    // Guardar las nuevas estadísticas en el LocalStorage
    localStorage.setItem('estadisticas', JSON.stringify(estadisticasNuevas))

    // Actualizar el estado global de las estadísticas con las nuevas estadísticas
  }

  const handleVolver = () => {
    handleReset()
    props.onTerminarCuestionario()
  }

  return (
    <div>
      <h1>Quizzes AWS</h1>
      <form onSubmit={handleSubmit}>
        {preguntasAleatorias.map((pregunta, index) => (
          <div key={index} className={`pregunta-${index + 1}`}>
            <h3>{pregunta.enunciado}</h3>
            <label>
              <input
                type='checkbox'
                name={index}
                value='1'
                onClick={handleChange}
                disabled={terminado}
                checked={respuestas[index]?.includes('1')}
              />
              {pregunta.respuesta1}
              {/*  */}
              <br />
            </label>
            <label className={`pregunta-${index + 1}`}>
              <input
                type='checkbox'
                name={index}
                value='2'
                onClick={handleChange}
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
                onClick={handleChange}
                checked={respuestas[index]?.includes('3')}
                disabled={terminado}
              />
              {pregunta.respuesta3}
              <br />
            </label>
            <label>
              <input
                type='checkbox'
                name={index}
                value='4'
                onClick={handleChange}
                checked={respuestas[index]?.includes('4')}
                disabled={terminado}
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
                  onClick={handleChange}
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
                  onClick={handleChange}
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
      {terminado && (
        <h1>Estadísticas: {apto ? <h2>APTO</h2> : <h2>NO APTO</h2>}</h1>
      )}
      {terminado && <p>Has acertado: {puntuacion}</p>}
      {terminado && (
        <p>Has fallado: {props.numPreguntas - puntuacion}</p>
      )}
      {terminado && (
        <p>
          Has acertado el {porcentajeAcertado * 100}% de las preguntas (+72%
          para APTO)
        </p>
      )}
      {terminado && porcentajeAcertado < 0.72 && (
        <p>Necesitas un: +{72 - porcentajeAcertado * 100}% para el APTO</p>
      )}
      {terminado && (
        <p>
          Tiempo empleado: {Math.round((elapsedTime / 60000) * 100) / 100}{' '}
          minutos
        </p>
      )}
      {terminado && (
        <p>
          Tiempo medio por pregunta:{' '}
          {Math.round(
            (elapsedTime / 60000 / props.numPreguntas) * 100
          ) / 100}{' '}
          minutos
        </p>
      )}
      {/* Boton que permite reintentar el cuestionario */}
      {terminado && <button onClick={handleReset}>Intentar otro</button>}
      {terminado && <button onClick={handleVolver}>Volver al menú</button>}
    </div>
  )
}

export default Formulario
