export const salvarContas = (contas) => {
  localStorage.setItem("contas", JSON.stringify(contas))
}

export const carregarContas = () => {
  const contas = localStorage.getItem("contas")
  return contas ? JSON.parse(contas) : []
}

export const salvarSessao = (usuario) => {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario))
}

export const carregarSessao = () => {
  const usuario = sessionStorage.getItem("usuarioLogado")
  return usuario ? JSON.parse(usuario) : null
}

export const removerSessao = () => {
  sessionStorage.removeItem("usuarioLogado")
  sessionStorage.removeItem("perfilSelecionado")
}
