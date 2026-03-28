import { Outlet } from 'react-router-dom'
import Navbar from "./component/Navbar.jsx"





function App() {

  return <div className="w-full h-screen bg-amber-100 ">
    <Navbar/>
    <Outlet/>
   

  </div>
}

export default App
