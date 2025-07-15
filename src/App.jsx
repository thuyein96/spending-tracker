import { useForm } from 'react-hook-form'
import './App.css'
import categoryData from './utils/spending-category.json'
import DataTable from './components/DataTable'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import SpendingForm from './components/SpendingForm'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/spending-tracker" element={<SpendingForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
