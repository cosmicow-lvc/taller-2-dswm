import React from 'react'

export default function FeatureSection({ imagen, title, text, cta }) {
  return (
    <section className="relative text-white">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${imagen || '/images/pokemon.jpg'})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-black/10"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-36">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{title}</h2>
          <p className="mt-4 text-lg text-slate-100">{text}</p>

          {cta && <div className="mt-6">{cta}</div>}
        </div>
      </div>
    </section>
  )
}