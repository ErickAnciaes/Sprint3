"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { salvarContas, carregarContas } from "../utils/api"
import Input from "../components/Input" 

export default function Cadastro() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    senha: "",
    idade: "",
    posicao: "",
    cidade: "",
    foto: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const contas = carregarContas()
    const novaConta = { ...formData, idConta: contas.length + 1 }
    contas.unshift(novaConta)
    salvarContas(contas)
    alert("Cadastro completo!")
    navigate("/login")
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#272626] text-white font-montserrat">
      <div className="w-full md:w-1/2 flex flex-col items-center p-5 md:p-10 lg:p-20">
        <h1 className="text-3xl md:text-4xl font-bold my-5">Cadastre-se</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
          <Input id="username" label="Usuário" type="text" value={formData.username} onChange={handleChange} required />
          <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
          <Input id="senha" label="Senha" type="password" value={formData.senha} onChange={handleChange} required />
          <div className="flex justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <Input id="idade" label="Idade" type="number" value={formData.idade} onChange={handleChange} required />
            </div>
            <div className="flex flex-col w-1/2">
              <Input
                id="posicao"
                label="Posição"
                type="text"
                value={formData.posicao}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <Input id="cidade" label="Cidade" type="text" value={formData.cidade} onChange={handleChange} required />
            </div>
            <div className="flex flex-col w-1/2">
              <Input id="foto" label="Foto (URL)" type="url" value={formData.foto} onChange={handleChange} />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-2/3 rounded-xl bg-orange-600 border border-gray-300 text-white text-xl py-2 transition-colors duration-300 hover:bg-orange-700"
            >
              Cadastrar
            </button>
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input id="privacyPolicy" type="checkbox" required className="accent-white h-5 w-5" />
            <label htmlFor="privacyPolicy" className="text-sm">
              Ao continuar, você concorda com os termos de uso e a Política de Privacidade
            </label>
          </div>
        </form>
        <div className="h-0.5 bg-gray-400 w-3/4 my-8" />
        <a href="/login" className="text-white text-lg no-underline hover:underline">
          Já tem uma conta? Faça seu login aqui.
        </a>
      </div>
      <div className="hidden md:block w-1/2 min-h-screen">
        <img
          src="public/assets/futebol feminino-marilia-marília cruzeiro-gabi portilho-1729432441.jpg"
          alt="Jogadora"
          className="w-full min-h-screen h-full object-cover object-center"
        />
      </div>
    </div>
  )
}
