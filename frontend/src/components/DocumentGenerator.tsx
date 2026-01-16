import { useState } from 'react'
import DocumentCard from './DocumentCard'
import './DocumentGenerator.css'

function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatCNPJ(cnpj: string): string {
  if (cnpj.length === 14 && /^\d+$/.test(cnpj)) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  return cnpj.replace(/(.{2})(.{3})(.{3})(.{4})(.{2})/, '$1.$2.$3/$4-$5')
}

interface Document {
  type: 'cpf' | 'cnpj-alfanumerico' | 'cnpj-numerico'
  value: string
  label: string
  loading: boolean
}

export default function DocumentGenerator() {
  const [useMask, setUseMask] = useState(true)

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

  const getDisplayValue = (doc: Document): string => {
    if (!doc.value) return ''
    if (!useMask) return doc.value
    
    if (doc.type === 'cpf') return formatCPF(doc.value)
    return formatCNPJ(doc.value)
  }

  return (
    <div className="document-generator">
      <div className="mask-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={useMask}
            onChange={(e) => setUseMask(e.target.checked)}
          />
          <span className="toggle-text">Exibir com máscara</span>
        </label>
      </div>

      <div className="cards-container">
        <DocumentCard
          document={{ ...cpf, value: getDisplayValue(cpf) }}
          rawValue={cpf.value}
          onGenerate={() => generateDocument('cpf')}
        />
        <DocumentCard
          document={{ ...cnpjAlfanumerico, value: getDisplayValue(cnpjAlfanumerico) }}
          rawValue={cnpjAlfanumerico.value}
          onGenerate={() => generateDocument('cnpj-alfanumerico')}
        />
        <DocumentCard
          document={{ ...cnpjNumerico, value: getDisplayValue(cnpjNumerico) }}
          rawValue={cnpjNumerico.value}
          onGenerate={() => generateDocument('cnpj-numerico')}
        />
      </div>

      <button className="btn btn-primary" onClick={generateAll}>
        🎲 Gerar Todos
      </button>
    </div>
  )
}
