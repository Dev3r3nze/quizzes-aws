import { useState } from 'react'
import Formulario from './components/FormularioCompo'
import Configurador from './components/Configurador'
import './App.css'

function App () {
  const [mostrarConfigurador, setMostrarConfigurador] = useState(true)

  function reiniciarCuestionario () {
    setMostrarConfigurador(true)
  }

  return (
    <div className='App'>
      {mostrarConfigurador
        ? (
          <Configurador onIniciarCuestionario={() => setMostrarConfigurador(false)} />
          )
        : (
          <Formulario onTerminarCuestionario={reiniciarCuestionario} />
          )}
    </div>
  )
}

export default App

// ToDo:
// Json con preguntas
// Seleccionar preguntas aleatorias del json
// Formulario de selecciónd de temas
// Repetir formulario o volver al menu
// Guardar estadisticas para ver progreso
