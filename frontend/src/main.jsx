import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter}from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Todo from './component/Todo.jsx'
import Register from './component/register.jsx'


export const BASE_URL =
  "http://localhost:3000"
  const route =createBrowserRouter([
    {
      path:"/",
      element:<App/>
    },{
       path:"/todo",
       element:<Todo/>
    },{
      path:"/register",
      element:<Register/>
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
