import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

export default function MonsterHigh() {
  const API_BASE = "http://localhost:3002"
  const [personajes, setPersonajes] = useState([])
  const [especies, setEspecies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState("all")
  const [openId, setOpenId] = useState(null) // id of open dropdown (single)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [pRes, eRes] = await Promise.all([
          fetch(`${API_BASE}/personajes`),
          fetch(`${API_BASE}/especies`)
        ])
        if (!pRes.ok) throw new Error(`/personajes -> ${pRes.status}`)
        if (!eRes.ok) throw new Error(`/especies -> ${eRes.status}`)
        const pData = await pRes.json()
        const eData = await eRes.json()
        setPersonajes(Array.isArray(pData) ? pData : (pData.results || []))
        setEspecies(Array.isArray(eData) ? eData : (eData.results || []))
      } catch (err) {
        setError(err.message ?? String(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const especieMap = Object.fromEntries(
    especies.map(e => {
      const key = e.id ?? e._id ?? e.nombre ?? e.name
      const label = e.nombre ?? e.name ?? String(key)
      return [key, label]
    })
  )

  const itemsFiltered = personajes.filter(p => {
    const nombre = String(p.nombre ?? p.name ?? "").toLowerCase()
    const matchesSearch = !search.trim() || nombre.includes(search.toLowerCase())
    const especieKey = p.especie_id ?? p.especie ?? p.especieId ?? p.specie
    const matchesSpecies = selectedSpecies === "all" || String(especieKey) === String(selectedSpecies)
    return matchesSearch && matchesSpecies
  })

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Monster High</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Revisa los detalles de los personajes recopilados por nosotros.</p>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-3 items-center">
          <div className="sm:col-span-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar personaje..."
              className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Todas las especies</option>
              {especies.map(es => {
                const key = es.id ?? es._id ?? es.nombre ?? es.name
                const label = es.nombre ?? es.name ?? String(key)
                return <option key={key} value={key}>{label}</option>
              })}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
            <div className="space-y-2 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Mostrando {itemsFiltered.length} de {personajes.length} personajes
            </div>

            <div className="space-y-3">
              {itemsFiltered.length === 0 && (
                <div className="p-4 bg-white dark:bg-slate-800 rounded text-slate-500">No se encontraron personajes.</div>
              )}

              {itemsFiltered.map((p, i) => {
                const id = p.id ?? p._id ?? i
                const nombre = p.nombre ?? p.name ?? `#${id}`
                const especieKey = p.especie_id ?? p.especie ?? p.especieId ?? p.specie
                const especie = especieMap[especieKey] ?? (typeof especieKey === "string" ? especieKey : "Desconocida")
                const descripcion = p.descripcion ?? p.description ?? null
                const image = p.image ?? p.foto ?? p.img ?? null

                return (
                  <div key={id} className="bg-white dark:bg-slate-800 rounded-lg shadow">
                    <button
                      onClick={() => toggle(id)}
                      aria-expanded={openId === id}
                      className="w-full text-left px-4 py-3 flex items-center justify-between focus:outline-none"
                    >
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{nombre}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-300">{especie}</div>
                      </div>
                      <div className="text-slate-400">{openId === id ? "▲" : "▼"}</div>
                    </button>

                    {openId === id && (
                      <div className="border-t px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {image ? (
                          <img src={image} alt={nombre} className="w-full h-44 object-cover rounded mb-3" />
                        ) : null}

                        {descripcion ? <p className="mb-2">{descripcion}</p> : <p className="mb-2 text-slate-500">Sin descripción.</p>}

                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{p.age ? `Edad: ${p.age}` : ""}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}