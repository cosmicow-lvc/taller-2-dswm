import React, { useEffect, useState } from "react"
import Navbar from "../components/navbar"

function MonsterHigh() {
  const [personajes, setPersonajes] = useState([])
  const [especies, setEspecies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState("all")

  // Bases y posibles rutas que pruebo hasta que alguna responda
  const BASES = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
  ]
  const PERSONAJES_PATHS = ["/personajes", "/api/personajes", "/personaje", "/personajes/all"]
  const ESPECIES_PATHS = ["/especies", "/api/especies", "/especie", "/especies/all"]

  useEffect(() => {
    const fetchFromAny = async (paths) => {
      for (const base of BASES) {
        for (const p of paths) {
          try {
            const res = await fetch(`${base}${p}`, { mode: "cors" })
            if (!res.ok) continue
            const data = await res.json()
            return data
          } catch {
            // seguir probando
          }
        }
      }
      throw new Error("No se encontró endpoint disponible. Revisa que el backend esté levantado y CORS.")
    }

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [pData, eData] = await Promise.all([
          fetchFromAny(PERSONAJES_PATHS),
          fetchFromAny(ESPECIES_PATHS)
        ])
        setPersonajes(Array.isArray(pData) ? pData : (pData.results || [pData]))
        setEspecies(Array.isArray(eData) ? eData : (eData.results || [eData]))
      } catch (err) {
        setError(err.message ?? String(err))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const especieMap = Object.fromEntries(
    especies.map(e => [
      e.id ?? e._id ?? e.nombre ?? e.name,
      e.nombre ?? e.name ?? "Desconocida"
    ])
  )

  // Filtrado por búsqueda y especie
  const itemsFiltered = personajes.filter(p => {
    const nombre = (p.nombre ?? p.name ?? "").toString().toLowerCase()
    const matchesSearch = !search.trim() || nombre.includes(search.toLowerCase())
    const especieKey = p.especie_id ?? p.especie ?? p.especieId ?? p.specie
    const matchesSpecies = selectedSpecies === "all" || String(especieKey) === String(selectedSpecies)
    return matchesSearch && matchesSpecies
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Monster High</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Explora personajes y sus especies. Filtra y busca rápidamente.</p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3 items-center">
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-600 mb-2">Buscar personaje</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ej: Frankie, Clawdeen..."
              className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Filtrar por especie</label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Todas</option>
              {especies.map(es => {
                const key = es.id ?? es._id ?? es.nombre ?? es.name
                const label = es.nombre ?? es.name ?? key
                return <option key={key} value={key}>{label}</option>
              })}
            </select>
          </div>
        </section>

        {loading ? (
          <div className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow animate-pulse">
                  <div className="h-36 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Mostrando {itemsFiltered.length} de {personajes.length} personajes
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Especies cargadas: {especies.length}
              </div>
            </div>

            {itemsFiltered.length === 0 ? (
              <div className="p-6 bg-white dark:bg-slate-800 rounded text-slate-500">No se encontraron personajes.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsFiltered.map((p, i) => {
                  const id = p.id ?? p._id ?? i
                  const nombre = p.nombre ?? p.name ?? `#${id}`
                  const especieKey = p.especie_id ?? p.especie ?? p.especieId ?? p.specie
                  const especie = especieMap[especieKey] ?? (typeof especieKey === "string" ? especieKey : "Desconocida")
                  const descripcion = p.descripcion ?? p.description ?? null
                  const image = p.image ?? p.foto ?? p.img ?? null

                  return (
                    <article key={id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex flex-col">
                      {image ? (
                        <img src={image} alt={nombre} className="h-40 w-full object-cover rounded mb-3" />
                      ) : (
                        <div className="h-40 w-full bg-gradient-to-r from-pink-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded mb-3 flex items-center justify-center text-slate-500">
                          Sin imagen
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{nombre}</h3>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300"><strong>Especie:</strong> {especie}</div>
                        {descripcion && <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{descripcion}</p>}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500">{p.age ? `Edad: ${p.age}` : ""}</span>
                        <button
                          onClick={() => navigator.clipboard?.writeText(JSON.stringify(p))}
                          className="text-xs px-2 py-1 border rounded text-slate-600 dark:text-slate-300"
                        >
                          Copiar JSON
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default MonsterHigh