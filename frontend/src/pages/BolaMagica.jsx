import React, { useState } from 'react'
import Navbar from '../components/navbar'

export default function BolaMagica() {
  const apiBase = 'http://localhost:3001' // ajusta si tu backend está en otro puerto
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
      // Construye URL correctamente y usa '&' entre query params
      const url = `${apiBase}/bola_magica?locale=es${prompt.trim() ? `&question=${encodeURIComponent(prompt.trim())}` : ''}`
      const res = await fetch(url, { method: 'GET' })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message ?? String(err))
    } finally {
      setLoading(false)
    }
  }

  // Calcula sólo el valor de la clave "reading"
  const reading = result == null
    ? null
    : (typeof result === 'object' ? (result.reading ?? null) : String(result))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bola Mágica</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Escribe tu pregunta y pulsa Preguntar.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Escribe tu pregunta (opcional)"
              className="w-full rounded-md border px-3 py-2 resize-none"
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
              <div className="mt-2 whitespace-pre-wrap">
                {reading ?? JSON.stringify(result, null, 2)}
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="mt-4 text-slate-500">Aquí aparecerá la decisión de los dioses del azar.</div>
          )}
        </section>
      </main>
    </div>
  )
}