import React, { useState } from 'react'
import Navbar from '../components/navbar'

export default function BolaMagica() {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Ajusta el endpoint y el shape del body según tu controlador (aquí usamos POST /bolamagica con { question })
      const res = await fetch(`${apiBase}/bolamagica`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`${res.status} ${res.statusText} - ${text}`)
      }

      const data = await res.json()
      // Intenta detectar la propiedad de respuesta más común
      setResult(data.answer ?? data.result ?? data.message ?? data)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bola Mágica</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Escribe tu pregunta y la API te responderá.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="¿Debo estudiar hoy? ¿Cuál es el mejor Pokémon para comenzar?"
              className="w-full rounded-md border px-3 py-2 resize-none"
              required
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-60"
            >
              {loading ? 'Consultando...' : 'Preguntar'}
            </button>

            <button
              type="button"
              onClick={() => { setPrompt(''); setResult(null); setError(null) }}
              className="px-3 py-2 border rounded-md"
            >
              Limpiar
            </button>
          </div>
        </form>

        <section className="mt-8">
          {error && <div className="text-red-600 dark:text-red-400">Error: {error}</div>}

          {result && (
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 border rounded-md text-slate-900 dark:text-slate-100">
              <strong>Respuesta:</strong>
              <div className="mt-2 whitespace-pre-wrap">{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="mt-4 text-slate-500">Aquí aparecerá la respuesta de la API.</div>
          )}
        </section>
      </main>
    </div>
  )
}