"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { carregarSessao, salvarContas, carregarContas, salvarSessao } from "../utils/api" // Adicionado salvarSessao para o caso de atualizar o próprio perfil
import Header from "../components/Header"

const FOTO_PADRAO = "/assets/usuario sem foto.jpg"

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [formData, setFormData] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
  const usuarioLogado = carregarSessao()
  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o perfil!")
    navigate("/login")
    return
  }
  const perfilSelecionadoString = sessionStorage.getItem("perfilSelecionado")
  if (perfilSelecionadoString) {
    try {
      const perfilSelecionado = JSON.parse(perfilSelecionadoString)
      setPerfil(perfilSelecionado)
      const owner = perfilSelecionado.email === usuarioLogado.email
      setIsOwner(owner)
      setFormData(owner ? { ...perfilSelecionado } : {})
      sessionStorage.removeItem("perfilSelecionado")
    } catch {
      setPerfil(usuarioLogado)
      setIsOwner(true)
      setFormData({ ...usuarioLogado })
    }
  } else {
    setPerfil(usuarioLogado)
    setIsOwner(true)
    setFormData({ ...usuarioLogado })
  }
}, [navigate])
 // Removed perfil from dependencies to prevent re-execution

  useEffect(() => {
    console.log("Estado atual do Perfil:", perfil)
    console.log("Estado atual do formData:", formData)
  }, [perfil, formData])

  const entrarEdicao = () => {
    if (!isOwner) return
    console.log("[v0] Entrando no modo de edição")
    setModoEdicao(true)
    setFormData({ ...perfil })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(`Alterando campo ${id}: ${value}`)
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }))
  }

  const salvarEdicao = () => {
    if (!isOwner) return

    console.log("[v0] Tentando salvar edição:", formData)

    if (!formData.username || !formData.email || !formData.idade || !formData.posicao || !formData.cidade) {
      alert("Por favor, preencha todos os campos!")
      return
    }

    const contas = carregarContas()
    const usuarioLogado = carregarSessao()

    const indice = contas.findIndex((c) => c.email === usuarioLogado?.email)

    if (indice !== -1) {
      const emailJaExiste = contas.some((c, i) => c.email === formData.email && i !== indice)

      if (emailJaExiste) {
        alert("Este email já está em uso por outro usuário!")
        return
      }

      const novaLista = [...contas]
      novaLista[indice] = formData
      salvarContas(novaLista)
      salvarSessao(formData)

      console.log("[v0] Perfil atualizado:", formData)
    }

    setPerfil(formData)
    setModoEdicao(false)
    alert("Perfil atualizado com sucesso!")
  }

  const cancelarEdicao = () => {
    console.log("[v0] Cancelando edição")
    setModoEdicao(false)
    setFormData({ ...perfil })
  }

  if (!perfil) {
    return <div className="text-center mt-20 text-gray-600">Carregando perfil...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
      <Header titulo={isOwner ? "Meu Perfil" : `Perfil de ${perfil.username}`} mostrarSair={isOwner} />

      <main className="flex justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={perfil.foto || FOTO_PADRAO}
              alt={`Foto de ${perfil.username}`}
              className="w-36 h-36 rounded-full object-cover border-4 border-purple-500 mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">
              {modoEdicao ? (
                <input
                  id="username"
                  type="text"
                  value={formData.username || ""}
                  onChange={handleChange}
                  className="w-full text-center p-2 border-b-2 border-gray-400 focus:outline-none"
                />
              ) : (
                perfil.username
              )}
            </h2>
            <p className="text-green-500 font-semibold mt-1">Jogadora Ativa</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <span className="block font-semibold text-gray-500 text-sm">Email</span>
              <span className="block text-lg mt-1">
                {modoEdicao ? (
                  <input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 border-gray-400 focus:outline-none"
                  />
                ) : (
                  perfil.email
                )}
              </span>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <span className="block font-semibold text-gray-500 text-sm">Idade</span>
              <span className="block text-lg mt-1">
                {modoEdicao ? (
                  <input
                    id="idade"
                    type="number"
                    value={formData.idade || ""}
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 border-gray-400 focus:outline-none"
                  />
                ) : (
                  perfil.idade
                )}
              </span>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <span className="block font-semibold text-gray-500 text-sm">Posição</span>
              <span className="block text-lg mt-1">
                {modoEdicao ? (
                  <select
                    id="posicao"
                    value={formData.posicao || ""}
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 border-gray-400 focus:outline-none"
                  >
                    <option value="Goleira">Goleira</option>
                    <option value="Zagueira">Zagueira</option>
                    <option value="Lateral">Lateral</option>
                    <option value="Meio-campo">Meio-campo</option>
                    <option value="Atacante">Atacante</option>
                  </select>
                ) : (
                  perfil.posicao
                )}
              </span>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <span className="block font-semibold text-gray-500 text-sm">Cidade</span>
              <span className="block text-lg mt-1">
                {modoEdicao ? (
                  <input
                    id="cidade"
                    type="text"
                    value={formData.cidade || ""}
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 border-gray-400 focus:outline-none"
                  />
                ) : (
                  perfil.cidade
                )}
              </span>
            </div>
          </div>

          {isOwner && (
            <div className="flex justify-center space-x-4 mt-8">
              {!modoEdicao && (
                <button
                  onClick={entrarEdicao}
                  className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all hover:bg-purple-700"
                >
                  Editar Perfil
                </button>
              )}
              {modoEdicao && (
                <>
                  <button
                    onClick={salvarEdicao}
                    className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full transition-all hover:bg-green-600"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelarEdicao}
                    className="bg-gray-500 text-white font-semibold py-3 px-8 rounded-full transition-all hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          )}

          {!isOwner && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/feed")}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all hover:bg-blue-700"
              >
                Voltar ao Feed
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
