import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PokemonContextProvider } from './context/PokemonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PokemonContextProvider>
        <App />
    </PokemonContextProvider>
    ,
)
