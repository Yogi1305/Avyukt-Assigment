import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Route, RouterProvider}from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Todo from './component/Todo.jsx'
import Register from './component/register.jsx'
import Login from './component/login.jsx'
import { ProtectRoute } from './utils/protectroute.js'


export const BASE_URL =
  "http://localhost:8000"
  const route =createBrowserRouter([
    {
      path:"/",
      element:<App/>
    },{
       path:"/todo",
       element:<ProtectRoute><Todo/></ProtectRoute>
    },{
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={route}/>
  </StrictMode>,
)
