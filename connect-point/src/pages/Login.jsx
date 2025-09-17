import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { carregarContas, salvarSessao } from "../utils/api";
import Input from "../components/Input";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const contas = carregarContas();
    const user = contas.find(
      (c) => (c.email === usuario || c.username === usuario) && c.senha === senha
    );

    if (user) {
      salvarSessao(user);
      alert("Acesso liberado!");
      navigate("/perfil");
    } else {
      alert("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#272626] text-white font-montserrat">
      <div className="w-full md:w-1/2 flex flex-col items-center p-5 md:p-10 lg:p-20">
        <h1 className="text-3xl md:text-4xl font-bold my-5">Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">
          <Input
            id="loginUsuario"
            label="Usuário ou email"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="border-2 border-white rounded-md h-10 bg-transparent text-white px-3 focus:outline-none focus:border-orange-500"
          />

          <Input
            id="loginSenha"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border-2 border-white rounded-md h-10 bg-transparent text-white px-3 focus:outline-none focus:border-orange-500"
          />

          <div className="flex items-start gap-2">
            <input id="remember" type="checkbox" className="accent-white h-5 w-5" />
            <label htmlFor="remember" className="text-sm">Lembrar de mim</label>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-2/3 rounded-xl bg-orange-600 border border-gray-300 text-white text-xl py-2 transition-colors duration-300 hover:bg-orange-700"
            >
              Login
            </button>
          </div>
        </form>

        <a href="#" className="text-white text-base no-underline hover:underline mt-4">
          Esqueceu a senha?
        </a>

        <div className="h-0.5 bg-gray-400 w-3/4 my-8" />


        <Link to="/cadastro" className="text-white text-lg no-underline hover:underline">
          Ainda não tem cadastro?
        </Link>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src="/jogadora-santos.webp"
          alt="Jogadora"
          className="object-cover object-center w-full min-h-screen"
        />
      </div>
    </div>
  );
}
