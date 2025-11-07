## Connect Point

### Objetivo

Este projeto tem como finalidade criar uma plataforma para que jogadoras de futebol feminino possam se cadastrar, montar um perfil pessoal e se divulgar para clubes, olheiros e interessados. A proposta é oferecer um espaço simples e acessível que amplie a visibilidade dessas atletas e facilite a conexão com oportunidades no esporte.

---

## Funcionalidades

### Cadastro e autenticação
- **Cadastro de jogadoras** com nome, idade, posição, cidade e foto.
- **Login com gerenciamento de sessão**, permitindo acesso apenas às áreas autorizadas.
- **Perfil da jogadora** com exibição completa das informações cadastradas.
- **Foto padrão automática** caso a jogadora não envie imagem.

### Feed das jogadoras
- Exibição das atletas em formato de **cards** (nome, posição, cidade e foto).
- Sistema de **busca com filtro inteligente**, permitindo pesquisar por nome, cidade ou posição.

### Novas funcionalidades implementadas (Sprint 4)

### Painel estatístico 
Um painel dinâmico foi implementado no Feed, exibindo:

- Número total de jogadoras cadastradas
- Criado a parir da revisão do DOM
- Contagem de jogadoras **por posição**
  - Exemplo: 2 Atacantes, 1 Goleira, 3 Zagueiras…
- Essa funcionalidade transforma o Feed em um mini dashboard, permitindo que clubes e olheiros visualizem rapidamente o perfil das jogadoras cadastradas.

## Elementos interativos
- Foi Adicionados o uso de elementos interativos como modal e dropdown


---

## Público-Alvo

- Jogadoras de futebol feminino que desejam visibilidade.
- Clubes, treinadores e olheiros que buscam novas atletas.

---

## Impacto Esperado

- Facilitar a descoberta de talentos no futebol feminino.
- Criar uma **vitrine digital organizada e acessível**.
- Contribuir para o crescimento e profissionalização das atletas.

---

## Tecnologias usadas

| Tecnologia | Uso |
|------------|-----|
| React + Vite | Front-end da aplicação |
| TailwindCSS | Estilização |
| LocalStorage | Persistência de dados da sessão e perfis |
| JSON local (public/data/jogadoras.json) | Base de dados inicial |
| RandomUser API | Simulação de imagens de jogadoras |

---

## Uso de API

Foi utilizada a API **https://randomuser.me/api** exclusivamente para simulação de fotos de perfil quando a jogadora não envia uma imagem, agora manipulada com JSON local usando fetch

---

## Nosso time

| Nome | RM |
|------|----|
| Erick Munhoes Anciães | 561484 |
| João Pedro Mendes De Figueiredo | 558779 |
| Patrick Canuto | 563776 |
| João Paulo Fernandes | 563430 |
| Ben-Hur Iung | 561564 |

---

## 🔗 Link do Site (Deploy)

➡️ **https://sprint3-three.vercel.app**

