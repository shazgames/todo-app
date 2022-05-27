import React from "react"
import { Grid } from "@mui/material"
import "./app.css"
import { NavBar, NewTaskDialog } from "./components"
import AppRoutes from "./routes"

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <NewTaskDialog />
      <Grid container height={"100%"}>
        <Grid item height={"100%"}>
          <NavBar />
        </Grid>
        <Grid item xs>
          <main style={{ height: "100vh", padding: "20px", overflow: "auto" }}>
            <AppRoutes />
          </main>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
