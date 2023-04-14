/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react'

function Stats (props) {
  const localStorage = window.localStorage
  const [estadisticas, setEstadisticas] = useState(null)

  // const [tiempoTotal, setTiempoTotal] = useState(0)
  // const [aciertosTotales, setAciertosTotales] = useState(0)
  // const [fallosTotales, setFallosTotales] = useState(0)
  // const [aptosTotales, setAptosTotales] = useState(0)
  // const [noAptosTotales, setNoAptosTotales] = useState(0)
  // const [examenesTotales, setExamenesTotales] = useState(0)
  // const [tiempoMedioExamen, setTiempoMedioExamen] = useState(0)
  // const [tiempoMedioPregunta, setTiempoMedioPregunta] = useState(0)
  // const [porcentajeAciertos, setPorcentajeAciertos] = useState(0)
  // const [porcentajeFallos, setPorcentajeFallos] = useState(0)
  // const [porcentajeAptos, setPorcentajeAptos] = useState(0)
  // const [porcentajeNoAptos, setPorcentajeNoAptos] = useState(0)

  // useEffect(() => {
  //   setExamenesTotales(prevExamenesTotales => prevExamenesTotales + globalState.examen)

  //   setTiempoTotal(globalState.tiempo)
  //   setAciertosTotales(globalState.puntuacion)
  //   setFallosTotales(globalState.numPreguntas - globalState.puntuacion)
  //   setAptosTotales(globalState.aptos)
  //   setNoAptosTotales(examenesTotales - globalState.aptos)
  //   setTiempoMedioExamen(globalState.tiempo / tiempoTotal)
  //   setTiempoMedioPregunta(globalState.tiempo / globalState.numPreguntas / tiempoTotal)
  //   setPorcentajeAciertos(
  //     Math.round((globalState.puntuacion / globalState.numPreguntas) * 100)
  //   )
  //   setPorcentajeFallos(
  //     Math.round(
  //       ((globalState.numPreguntas - globalState.puntuacion) /
  //         globalState.numPreguntas) *
  //           100
  //     )
  //   )
  //   setPorcentajeAptos(Math.round((globalState.aptos / examenesTotales) * 100))
  //   setPorcentajeNoAptos(
  //     Math.round(((aptosTotales - globalState.aptos) / examenesTotales) * 100)
  //   )
  // }, [props.data])

  // console.log(globalState)

  useEffect(() => {
    const estadisticas = JSON.parse(localStorage.getItem('estadisticas')) || { tiempoTotal: 0, aciertosTotales: 0, preguntasTotales: 0, examenesTotales: 0 }
    setEstadisticas(estadisticas)
  }, [])
  return (
    <div>
      <h2>Estadísticas globales</h2>
      {estadisticas.preguntasTotales > 0
        ? <div>
          <p>Exámenes totales: {estadisticas.examenesTotales}</p>
          <p>Tiempo total: {Math.round((estadisticas.tiempoTotal / 60000) * 100) / 100} minutos</p>
          <p>Aptos totales: {estadisticas.aptosTotales}</p>
          <p>No aptos totales: {estadisticas.examenesTotales - estadisticas.aptosTotales}</p>
          <p>Aciertos totales: {estadisticas.aciertosTotales}</p>
          <p>Fallos totales: {estadisticas.fallosTotales}</p>
          <p>Preguntas totales: {estadisticas.preguntasTotales}</p>
          <p>Porcentaje de aciertos: {Math.round((estadisticas.aciertosTotales / estadisticas.preguntasTotales) * 100)}%</p>
          </div>
        : <div>
          <p>Exámenes totales: 0</p>
          <p>Tiempo total: 0 minutos</p>
          <p>Aptos totales: 0</p>
          <p>No aptos totales: 0</p>
          <p>Aciertos totales: 0</p>
          <p>Fallos totales: 0</p>
          <p>Preguntas totales: 0</p>
          <p>Porcentaje de aciertos: 0%</p>
          </div>}
      <h2>Estadísticas avanzadas {!props.premium && <i>(Premium)</i>}</h2>
      {/* Premium */}
      {props.premium && <p>Tiempo medio por examen: {Math.round((estadisticas.tiempoTotal / estadisticas.examenesTotales) * 100) / 100} segundos</p>}
      {props.premium && <p>Tiempo medio por pregunta: {Math.round((estadisticas.tiempoTotal / estadisticas.preguntasTotales) * 100) / 100} segundos</p>}
      {props.premium && <p>Porcentaje de fallos: {Math.round(((estadisticas.preguntasTotales - estadisticas.aciertosTotales) / estadisticas.preguntasTotales) * 100)}%</p>}
      {props.premium && <p>Porcentaje de aptos: {Math.round((estadisticas.aptosTotales / estadisticas.examenesTotales) * 100)}%</p>}
      {props.premium && <p>Porcentaje de no aptos: {Math.round(((estadisticas.examenesTotales - estadisticas.aptosTotales) / estadisticas.examenesTotales) * 100)}%</p>}

      <h2>Estadísticas por tema {!props.premium && <i>(Premium)</i>}</h2>
      <select name='' id='' disabled>
        <option value='0'>Seleciona el tema</option>
        <option value='1'>General</option>
        <option value='2'>S3</option>
        <option value='3'>IAM</option>
      </select>
      {props.premium && (
        <div>
          <p>Porcentaje de aptos por tema: -</p>
          <p>Porcentaje de no aptos por tema: -</p>
          <p>Porcentaje de aciertos por tema: -</p>
          <p>Porcentaje de fallos por tema: -</p>
          <p>Tiempo medio por examen por tema: -</p>
          <p>Tiempo medio por pregunta por tema: -</p>
          <p>Tema más aconsejado a repasar: -</p>
        </div>)}

      <h2>Te recomiendo: {Math.round((estadisticas.aptosTotales / estadisticas.examenesTotales) * 100) > 60
        ? <p>PRESENTARTE</p>
        : Math.round((estadisticas.aptosTotales / estadisticas.examenesTotales) * 100) > 40 ? <p>Buscar fecha</p> : <p>Seguir estudiando</p>}
      </h2>

    </div>
  )
}

export default Stats

// tiempo: elapsedTime,
//       puntuacion,
//       porcentaje: porcentajeAcertado,
//       aptos: apto ? 1 : 0
