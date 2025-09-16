import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Feed from "../components/Feed"
import Perfil from "../components/Perfil"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  )
}
