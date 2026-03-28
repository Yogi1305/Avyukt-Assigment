import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Todo from './component/Todo.jsx'
import Register from './component/Register.jsx'
import Login from './component/Login.jsx'
import { ProtectRoute } from './utils/protectroute.js'
import About from './component/About.jsx'
import Home from './component/Home.jsx'


// export const BASE_URL ="http://localhost:8000"
export const BASE_URL = "https://avyukt-assigment.onrender.com"

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
        path: "/",
        element: <Home/>
    }
      ,
      {
        path: "todo",
        element: <ProtectRoute><Todo /></ProtectRoute>
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path:"about",
        element:<About/>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={route}/>
  </StrictMode>,
)
