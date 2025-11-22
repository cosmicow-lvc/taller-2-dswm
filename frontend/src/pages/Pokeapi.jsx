import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

export default function Pokemon() {
  const API_BASE = "http://localhost:3003"

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // intentar /pokemons primero, luego /pokemon
        const tryFetch = async (path) => {
          const res = await fetch(`${API_BASE}${path}`)
          if (!res.ok) throw new Error(`${path} ${res.status}`)
          return res.json()
        }

        let data = null
        try { data = await tryFetch("/api/pokemon") } catch { /* ignore */ }
        if (!data) throw new Error("No se obtuvo lista desde ni /pokemon")

        // normalizar respuesta a array
        const list = Array.isArray(data) ? data : (data.results ?? data.items ?? [data])
        if (!cancelled) setItems(list)
      } catch (err) {
        if (!cancelled) setError(err.message ?? String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [API_BASE])

  const toggle = (id) => setOpenId(openId === id ? null : id)

  const filtered = items.filter(it => {
    const name = (it.name ?? it.nombre ?? "").toString().toLowerCase()
    return !search.trim() || name.includes(search.trim().toLowerCase())
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pokémon</h1>
          
          
        </header>

        <div className="mb-4 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="flex-1 rounded-lg border px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
          <button onClick={() => { setSearch(""); setOpenId(null) }} className="px-3 py-2 border rounded">Limpiar</button>
        </div>

        {loading ? (
          <div className="text-slate-500">Cargando pokemons…</div>
        ) : error ? (
          <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>
        ) : (
          <>
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-300">Mostrando {filtered.length} de {items.length}</div>

            <ul className="space-y-2">
              {filtered.length === 0 && <li className="p-3 bg-white dark:bg-slate-800 rounded text-slate-500">No hay resultados.</li>}

              {filtered.map((p, idx) => {
                const id = p.id ?? p._id ?? p.name ?? idx
                const name = p.name ?? p.nombre ?? `#${id}`
                const types = p.type ?? p.types ?? p.tipos ?? []
                const image = p.image_url ?? p.sprite ?? p.img ?? null
                const weight = p.weight ?? p.peso ?? null
                const height = p.height ?? p.altura ?? null
                console.log({ id, name, types, weight, height })

                return (
                  <li key={id} className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                    <button
                      onClick={() => toggle(id)}
                      className="w-full text-left px-4 py-3 flex items-center gap-4 focus:outline-none"
                      aria-expanded={openId === id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : <span className="text-xs text-slate-500">No image</span>}
                        </div>

                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-300">{Array.isArray(types) ? types.join(", ") : types}</div>
                        </div>
                      </div>

                      <div className="ml-auto text-slate-400">{openId === id ? "▲" : "▼"}</div>
                    </button>

                    {openId === id && (
                      <div className="border-t px-4 py-3 text-sm text-slate-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-900">
                        <div className="text-xs text-slate-500 space-y-1">
                           

                          <div className="mt-3 flex justify-end">
                            <button onClick={() => setOpenId(null)} className="px-2 py-1 border rounded text-xs">Cerrar</button>
                          </div>
                        </div>


                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}