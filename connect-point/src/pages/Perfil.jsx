"use client" // Se você está usando Next.js App Router, mantenha esta linha. Caso contrário, pode remover.

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { carregarSessao, salvarContas, carregarContas, salvarSessao } from "../utils/api"
import Header from "../components/Header"

const FOTO_PADRAO = "/assets/usuario sem foto.jpg"

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [formData, setFormData] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Perfil useEffect: Iniciando carregamento de perfil.");
    const usuarioLogado = carregarSessao();

    if (!usuarioLogado) {
      alert("Você precisa estar logado para acessar o perfil!");
      navigate("/login");
      return;
    }

    const perfilSelecionadoString = sessionStorage.getItem("perfilSelecionado");
    let perfilParaExibir = null;

    if (perfilSelecionadoString) {
      try {
        perfilParaExibir = JSON.parse(perfilSelecionadoString);
        sessionStorage.removeItem("perfilSelecionado"); 
        console.log("Perfil useEffect: Perfil carregado do sessionStorage (Feed):", perfilParaExibir.username);
      } catch (e) {
        console.error("Perfil useEffect: Erro ao parsear perfil selecionado da sessionStorage:", e);

        perfilParaExibir = usuarioLogado;
      }
    } else {
      perfilParaExibir = usuarioLogado;
      console.log("Perfil useEffect: Nenhum perfil selecionado, exibindo perfil do usuário logado:", perfilParaExibir.username);
    }
    

    setPerfil(perfilParaExibir);

    const ehDono = perfilParaExibir.email === usuarioLogado.email;
    setIsOwner(ehDono);
    console.log("Perfil useEffect: É o dono do perfil?", ehDono);

    setFormData(ehDono ? { ...perfilParaExibir } : {}); 
    

    setModoEdicao(false);

  }, [navigate]);

  useEffect(() => {
    console.log("Estado atual do Perfil (render):", perfil);
    console.log("Estado atual do formData (render):", formData);
    console.log("Estado atual do isOwner (render):", isOwner);
    console.log("Estado atual do modoEdicao (render):", modoEdicao);
  }, [perfil, formData, isOwner, modoEdicao]);

  const entrarEdicao = () => {
    if (!isOwner) return;
    console.log("[Perfil] Entrando no modo de edição.");
    setModoEdicao(true);
    setFormData({ ...perfil }); 
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`[Perfil] Alterando campo ${id}: ${value}`);
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const salvarEdicao = () => {
    if (!isOwner) return;

    console.log("[Perfil] Tentando salvar edição. FormData:", formData);

    if (!formData.username || !formData.email || !formData.idade || !formData.posicao || !formData.cidade) {
      alert("Por favor, preencha todos os campos!");
      console.log("[Perfil] Erro: Campos incompletos.");
      return;
    }

    const contas = carregarContas();
    const usuarioLogado = carregarSessao(); 

    const indice = contas.findIndex((c) => c.email === usuarioLogado?.email);

    if (indice !== -1) {
      const emailJaExiste = contas.some((c, i) => c.email === formData.email && i !== indice);

      if (emailJaExiste) {
        alert("Este email já está em uso por outro usuário!");
        console.log("[Perfil] Erro: Email já existente.");
        return;
      }

      const novaLista = [...contas];
      novaLista[indice] = formData;
      salvarContas(novaLista); 
      salvarSessao(formData); 

      console.log("[Perfil] Perfil atualizado no localStorage e sessionStorage:", formData);
    } else {
      console.log("[Perfil] Erro: Perfil do usuário logado não encontrado na lista de contas para atualizar.");
      alert("Erro ao encontrar seu perfil para atualização.");
      return;
    }

    setPerfil(formData);
    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  const cancelarEdicao = () => {
    console.log("[Perfil] Cancelando edição.");
    setModoEdicao(false);
    setFormData({ ...perfil }); 
    alert("Edição cancelada.");
  };

  if (!perfil) {
    return <div className="text-center mt-20 text-gray-600">Carregando perfil...</div>;
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
  );
}