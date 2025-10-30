"use client"
import { useNavigate } from "react-router-dom"

export default function FeedCard({ jogadora }) {
  const navigate = useNavigate()
  const FOTO_PADRAO = "/assets/usuario sem foto.jpg"

  const handleClick = () => {
  const perfilData = {
    ...jogadora,
    _fromFeed: true,
  }
  sessionStorage.setItem("perfilSelecionado", JSON.stringify(perfilData))
  navigate("/perfil")
}

  return (
   <div
    onClick={handleClick}                 
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }} 
    className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
  >
      <div className="flex items-center mb-4">
        <img
          src={jogadora.foto || FOTO_PADRAO}
          alt={`Foto de ${jogadora.username}`}
          className="w-16 h-16 rounded-full object-cover border-4 border-purple-500 mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{jogadora.username}</h3>
          <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1 inline-block">
            {jogadora.posicao}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-500">Idade</span>
          <span>{jogadora.idade || "-"} anos</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-500">Cidade</span>
          <span>{jogadora.cidade}</span>
        </div>
      </div>
    </div>
  )
}
