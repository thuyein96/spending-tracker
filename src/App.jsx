import { useForm } from 'react-hook-form'
import './App.css'
import categoryData from './utils/spending-category.json'
import DataTable from './components/DataTable'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'

function App() {
  const categories = categoryData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const records = window.localStorage.getItem('records') ? JSON.parse(window.localStorage.getItem('records')) : []

  const onSubmit = (data) => {
    console.log(data)
    const category = categories.find(category => category.id === data.category)
    const record = {
      id: records.length + 1,
      name: category.name,
      amount: data.amount,
      date: data.date,
    }
    console.log(record)
    records.push(record)
    localStorage.setItem('records', JSON.stringify(records))
    alert('Expense added successfully!')
    // Reload the page to show updated data
    window.location.reload()
  }

  const HomePage = () => (
    <div className="app-container">
      <div className="app-header">
        <h1>Spending Tracker</h1>
        <p>Track your expenses and manage your budget</p>
      </div>
      
      <div className="main-layout">
        <div className="form-section">
          <h2>Add New Expense</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                {...register("date")}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select {...register("category")}>
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <div className="amount-input-container">
                <span className="currency-symbol">฿</span>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("amount")}
                />
              </div>
            </div>
            
            <button type="submit" className="submit-btn">Add Expense</button>
          </form>
        </div>

        <div className="table-section">
          <h2>Expense Records</h2>
          <DataTable data={records} />
        </div>
      </div>
    </div>
  )

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
