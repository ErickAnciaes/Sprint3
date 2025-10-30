export default function Dashboard({ stats = { players: 120, cidades: 20, ativos: 58 }}) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-sm text-gray-500">Jogadoras cadastradas</span>
          <div className="text-3xl font-bold">{stats.players}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-sm text-gray-500">Cidades</span>
          <div className="text-3xl font-bold">{stats.cidades}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-sm text-gray-500">Ativas</span>
          <div className="text-3xl font-bold">{stats.ativos}</div>
        </div>
      </div>
      {/* Você pode conectar esses números a localStorage ou fetch para serem dinâmicos */}
    </div>
  );
}
