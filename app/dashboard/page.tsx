'use client'

import { useState } from 'react'
import { DecodeResult } from '@/app/types/vin'

export default function Page() {
  const [vin, setVin] = useState('')
  const [result, setResult] = useState<DecodeResult | null>(null)
  const [error, setError] = useState('')

  async function handleDecode() {
    setError('')
    setResult(null)

    const res = await fetch('/api/vin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vin }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      return
    }

    setResult(data)
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Volvo VIN Decoder</h1>

      <input
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        placeholder="Wpisz VIN"
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={handleDecode}>Dekoduj</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <pre style={{ marginTop: 20 }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}
