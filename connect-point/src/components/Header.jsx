import { useNavigate, Link } from "react-router-dom"
import { removerSessao, carregarSessao } from "../utils/api"

export default function Header({ titulo, mostrarSair = true }) {
  const navigate = useNavigate()
  const usuarioLogado = carregarSessao()

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      removerSessao()
      navigate("/login")
    }
  }

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-lg mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{titulo}</h1>
      <nav className="flex items-center space-x-4 mt-4 md:mt-0">
        {usuarioLogado && (
          <Link to="/feed" className="text-purple-600 font-semibold text-lg hover:underline transition-colors">
            Ver Feed
          </Link>
        )}
        {mostrarSair && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full transition-all hover:bg-red-600"
          >
            Sair
          </button>
        )}
      </nav>
    </header>
  )
}
