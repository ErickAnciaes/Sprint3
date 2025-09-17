"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { carregarContas, removerSessao, carregarSessao } from "../utils/api"
import FeedCard from "../components/FeedCard"

const feedExemplo = [
  {
    username: "Maria Silva",
    posicao: "Atacante",
    idade: 22,
    cidade: "São Paulo",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    username: "Juliana Souza",
    posicao: "Zagueira",
    idade: 25,
    cidade: "Rio de Janeiro",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    username: "Ana Costa",
    posicao: "Meio-campo",
    idade: 20,
    cidade: "Belo Horizonte",
    foto: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    username: "Carla Santos",
    posicao: "Goleira",
    idade: 28,
    cidade: "Porto Alegre",
    foto: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    username: "Fernanda Lima",
    posicao: "Lateral",
    idade: 24,
    cidade: "Recife",
    foto: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    username: "Patrícia Oliveira",
    posicao: "Atacante",
    idade: 26,
    cidade: "Salvador",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]

export default function Feed() {
  const [todasJogadoras, setTodasJogadoras] = useState([])
  const [jogadorasFiltradas, setJogadorasFiltradas] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
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

    const todas = [...feedExemplo, ...outrasJogadoras]
    setTodasJogadoras(todas)
    setJogadorasFiltradas(todas)
  }, [navigate])

  useEffect(() => {
    const filtered = todasJogadoras.filter(
      (jogadora) =>
        jogadora.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jogadora.posicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jogadora.cidade.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setJogadorasFiltradas(filtered)
  }, [searchTerm, todasJogadoras])

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      removerSessao()
      navigate("/login")
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gradient-to-t from-purple-500 to-purple-600 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Feed de Jogadoras</h1>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
    <Link to="/perfil" className="text-purple-600 font-semibold text-lg hover:underline transition-colors">
      Meu Perfil
    </Link>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full transition-all hover:bg-red-600"
    >
      Sair
        </button>
     </nav>
    </header>


      <main className="bg-white p-8 rounded-3xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Descubra Novas Jogadoras</h2>
          <p className="text-gray-600 text-lg mt-2">Conecte-se com outras atletas da sua região</p>
        </div>

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
            <svg
              className="w-24 h-24 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-2xl font-bold text-gray-700">Nenhuma jogadora encontrada</h3>
            <p className="mt-2">Tente ajustar sua busca ou volte mais tarde.</p>
          </div>
        )}
      </main>
    </div>
  )
}