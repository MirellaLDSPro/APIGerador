import { useState } from 'react'
import './DocumentCard.css'

interface DocumentCardProps {
  document: {
    type: string
    value: string
    label: string
    loading: boolean
  }
  onGenerate: () => void
}

export default function DocumentCard({ document, onGenerate }: DocumentCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (document.value) {
      navigator.clipboard.writeText(document.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="document-card">
      <h3>{document.label}</h3>
      
      <div className="document-value">
        {document.loading ? (
          <span className="loading">Gerando...</span>
        ) : document.value ? (
          <code>{document.value}</code>
        ) : (
          <span className="placeholder">Clique em gerar</span>
        )}
      </div>

      <div className="card-actions">
        <button
          className="btn btn-secondary"
          onClick={onGenerate}
          disabled={document.loading}
        >
          {document.loading ? '⏳' : '🔄'} Gerar
        </button>
        
        {document.value && (
          <button
            className={`btn btn-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copiado!' : '📋 Copiar'}
          </button>
        )}
      </div>
    </div>
  )
}
