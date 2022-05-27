import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Completed from "./Completed"
import Favourite from "./Favourite"
import Today from "./Today"
import Deleted from "./Deleted"

export default function index() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={ <Home /> } />
        <Route path="favourite" element={ <Favourite /> } />
        <Route path="completed" element={ <Completed /> } />
        <Route path="today" element={ <Today /> } />
        <Route path="bin" element={ <Deleted /> } />
      </Route>
    </Routes>
  )
}
