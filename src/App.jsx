import React, { useState } from 'react'
import './App.css'
import Configurador from './components/Configurador'
import Formulario from './components/Formulario'

function App () {
  const [configurado, setConfigurado] = useState(false)

  return (
    <div className='App'>
      {configurado
        ? (
          <Formulario />
          )
        : (
          <Configurador setConfigurado={setConfigurado} />
          )}
    </div>
  )
}

export default App

// ToDo:
// Json con preguntas
// Seleccionar preguntas aleatorias del json
// Formulario de selecciónd de temas
// Quizz funcional
