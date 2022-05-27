import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App'
import { store, persistor } from "./store"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <SnackbarProvider maxSnack={ 3 }>
            <App />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
)
