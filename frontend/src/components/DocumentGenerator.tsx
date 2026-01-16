import { useState } from 'react'
import DocumentCard from './DocumentCard'
import './DocumentGenerator.css'

interface Document {
  type: 'cpf' | 'cnpj-alfanumerico' | 'cnpj-numerico'
  value: string
  label: string
  loading: boolean
}

export default function DocumentGenerator() {
  const [cpf, setCpf] = useState<Document>({
    type: 'cpf',
    value: '',
    label: 'CPF',
    loading: false
  })

  const [cnpjAlfanumerico, setCnpjAlfanumerico] = useState<Document>({
    type: 'cnpj-alfanumerico',
    value: '',
    label: 'CNPJ Alfanumérico',
    loading: false
  })

  const [cnpjNumerico, setCnpjNumerico] = useState<Document>({
    type: 'cnpj-numerico',
    value: '',
    label: 'CNPJ Numérico',
    loading: false
  })

  const generateDocument = async (type: 'cpf' | 'cnpj-alfanumerico' | 'cnpj-numerico') => {
    let setState
    if (type === 'cpf') setState = setCpf
    else if (type === 'cnpj-alfanumerico') setState = setCnpjAlfanumerico
    else setState = setCnpjNumerico

    try {
      setState(prev => ({ ...prev, loading: true }))

      const response = await fetch(`/api/${type}`)
      const data = await response.json()

      setState(prev => ({
        ...prev,
        value: data.cpf || data.cnpj,
        loading: false
      }))
    } catch (error) {
      console.error(`Erro ao gerar ${type}:`, error)
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const generateAll = async () => {
    await Promise.all([
      generateDocument('cpf'),
      generateDocument('cnpj-alfanumerico'),
      generateDocument('cnpj-numerico')
    ])
  }

  return (
    <div className="document-generator">
      <div className="cards-container">
        <DocumentCard
          document={cpf}
          onGenerate={() => generateDocument('cpf')}
        />
        <DocumentCard
          document={cnpjAlfanumerico}
          onGenerate={() => generateDocument('cnpj-alfanumerico')}
        />
        <DocumentCard
          document={cnpjNumerico}
          onGenerate={() => generateDocument('cnpj-numerico')}
        />
      </div>

      <button className="btn btn-primary" onClick={generateAll}>
        🎲 Gerar Todos
      </button>
    </div>
  )
}
