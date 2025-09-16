
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Perfil from './pages/Perfil';
import { carregarSessao } from './utils/api';

const RotaProtegida = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const usuarioLogado = carregarSessao();
    if (!usuarioLogado) {
      alert("Você precisa estar logado para acessar esta página!");
      navigate('/login');
    }
  }, [navigate]);
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={
          <RotaProtegida>
            <Feed />
          </RotaProtegida>
        } />
        <Route path="/perfil" element={
          <RotaProtegida>
            <Perfil />
          </RotaProtegida>
        } />
        <Route path="*" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}