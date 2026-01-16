import { useState } from 'react'
import DocumentGenerator from './components/DocumentGenerator'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎲 Gerador de Documentos</h1>
        <p>Gere CPF e CNPJ válidos instantaneamente</p>
      </header>
      <main className="app-main">
        <DocumentGenerator />
      </main>
      <footer className="app-footer">
        <p>© 2026 - API de Geração de Documentos</p>
      </footer>
    </div>
  )
}

export default App
