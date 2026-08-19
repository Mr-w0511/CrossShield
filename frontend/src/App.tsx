import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Compliance from './pages/Compliance'
import ProductAnalysis from './pages/ProductAnalysis'
import Reviews from './pages/Reviews'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="px-8 py-7 max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/product-analysis" element={<ProductAnalysis />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
