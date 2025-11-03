"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { carregarContas, removerSessao, carregarSessao } from "../utils/api"
import FeedCard from "../components/FeedCard"
import DomReview from "../components/DomReview"

export default function Feed() {
  const [todasJogadoras, setTodasJogadoras] = useState([])
  const [jogadorasFiltradas, setJogadorasFiltradas] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const usuarioLogado = carregarSessao()
    if (!usuarioLogado) {
      alert("Você precisa estar logado para acessar o feed!")
      navigate("/login")
      return
    }

    const contas = carregarContas()
    const outrasJogadoras = contas.filter(
      (c) => c.email !== usuarioLogado.email && c.username !== usuarioLogado.username && c.username,
    )

    async function carregarJsonLocal() {
      try {
        const res = await fetch("/assets/jogadoras.json", { cache: "no-store" })
        if (!res.ok) throw new Error("Resposta não OK")
        const dadosJson = await res.json()

       
        const todas = [...dadosJson, ...outrasJogadoras]
        setTodasJogadoras(todas)
        setJogadorasFiltradas(todas)
      } finally {
        setLoading(false)
      }
    }

    carregarJsonLocal()
  }, [navigate])

  useEffect(() => {
    const filtered = todasJogadoras.filter(
      (j) =>
        j.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.posicao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.cidade?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setJogadorasFiltradas(filtered)
  }, [searchTerm, todasJogadoras])

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      removerSessao()
      navigate("/login")
    }
  }

  if (loading) {
    return <div className="text-center mt-20">Carregando...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Feed de Jogadoras</h1>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to="/perfil" className="text-purple-600 font-semibold text-lg hover:underline transition-colors">Meu Perfil</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full">Sair</button>
        </nav>
      </header>

      <main className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl mx-auto lg:max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Descubra Novas Jogadoras</h2>
          <p className="text-gray-600 text-lg mt-2">Conecte-se com outras atletas da sua região</p>
        </div>

        <DomReview jogadoras={jogadorasFiltradas} />

        <div className="mb-8">
          <input
          type="text"
          id="searchInput"
          placeholder="Buscar por nome, posição ou cidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:border-purple-500 transition-colors"
         />
        </div>

        {jogadorasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jogadorasFiltradas.map((jogadora, index) => (
              <FeedCard key={index} jogadora={jogadora} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
            <h3 className="text-2xl font-bold text-gray-700">Nenhuma jogadora encontrada</h3>
            <p className="mt-2">Tente ajustar sua busca ou volte mais tarde.</p>
          </div>
        )}
      </main>
    </div>
  )
}
