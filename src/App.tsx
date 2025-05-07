import { RouterProvider } from 'react-router-dom'
import './App.css'
import appRoutes from './Router'

function App() {

  return (
    <div id='app'>

      <RouterProvider router={appRoutes} />

    </div>
  )
}

export default App
