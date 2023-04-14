import Configurador from './components/Configurador'
import './App.css'

function App () {
  // const localStorage = window.localStorage
  // const ultimoExamen = JSON.parse(localStorage.getItem('estadisticas'))

  return (
    <div className='App'>

      <Configurador />

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
