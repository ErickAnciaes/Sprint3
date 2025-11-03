"use client"
import React, { useEffect, useRef } from "react"

export default function DomReview({ jogadoras = [] }) {
  const statsRef = useRef(null)

  useEffect(() => {
    if (statsRef.current) {
      statsRef.current.classList.add("animate-pulse", "bg-yellow-100")
      setTimeout(() => {
        statsRef.current.classList.remove("animate-pulse", "bg-yellow-100")
      }, 1200)
    }
  }, [jogadoras])

  
  const pluralizar = (palavra) => {
    if (!palavra) return ""
    const p = palavra.toLowerCase()

    if (p.endsWith("al")) return palavra.slice(0, -2) + "ais"
    if (p.endsWith("el")) return palavra.slice(0, -2) + "éis"
    if (p.endsWith("il")) return palavra.slice(0, -2) + "is"
    if (p.endsWith("or")) return palavra + "as"
    if (p.endsWith("r")) return palavra + "es"
    if (p.endsWith("m")) return palavra.slice(0, -1) + "ns"
    if (p.endsWith("a")) return palavra + "s"
    if (p.endsWith("e")) return palavra + "s"
    if (p.endsWith("o")) return palavra.slice(0, -1) + "istas"
    return palavra + "s"
  }

 
  const total = jogadoras.length
  const porPosicao = jogadoras.reduce((acc, j) => {
    const posRaw = (j.posicao || "Desconhecida").trim().toLowerCase()
    const posCapitalizada = posRaw.charAt(0).toUpperCase() + posRaw.slice(1)
    acc[posCapitalizada] = (acc[posCapitalizada] || 0) + 1
    return acc
  }, {})

  return (
    <section
      ref={statsRef}
      className="my-6 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200"
    >
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        Estatísticas do Feed
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Um panorama geral das jogadoras atualmente no sistema.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        {/* Total geral */}
        <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-xl">
          <p className="text-3xl font-extrabold text-purple-700 dark:text-purple-200">
            {total}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Total</p>
        </div>

        {/* Exibição das posições no plural */}
        {Object.entries(porPosicao).map(([pos, count]) => {
          const nomePlural = pluralizar(pos)
          return (
            <div
              key={pos}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-105 transition-transform"
            >
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{count}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{nomePlural}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
