import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Compliance from './pages/Compliance'
import ProductAnalysis from './pages/ProductAnalysis'
import TrendPrediction from './pages/TrendPrediction'
import Reviews from './pages/Reviews'
import CompetitorTracking from './pages/CompetitorTracking'
import Pricing from './pages/Pricing'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

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
            <Route path="/trend-prediction" element={<TrendPrediction />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/competitor-tracking" element={<CompetitorTracking />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
