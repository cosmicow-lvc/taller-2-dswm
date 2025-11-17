import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-space-indigo to-amethyst text-white">
      <div className="mx-auto px-6 py-20 lg:py-28">
        <div className="grid min-h-[40vw] gap-10 lg:justify-center items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              InfoMóvil <br></br>
              Tu portal de información
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-sky-100 max-w-prose">
              Descubre herramientas e información sobre temas que te encantan: Bola Mágica, Pokémon, Monster High. Contenido práctico, interactivo y listo para explorar.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}