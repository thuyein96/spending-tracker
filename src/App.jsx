import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import categoryData from './utils/spending-category.json'

function App() {
  const categories = categoryData.categories
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [records, setRecords] = useState([])

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
    setRecords([...records])

  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date")}
          />
        </div>
          <label htmlFor="category">Category</label>
          <div className="space-y-3">
            <select
              {...register("category")}
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>{category.name}</option>
                )
              }
              )
              }
            </select>
          </div>
          <div>
              <label htmlFor="amount">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500">฿</span>
                </div>
                <input
                  style={{ textAlign: 'right' }}
                  type="number"
                  {...register("amount")} />
              </div>
            </div>
            <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Records:</h3>
        {records.map(record => (
          <div key={record.id}>
            {record.name} - ฿{record.amount} - {record.date}
          </div>
        ))}
      </div> 
    </>
  )
}

export default App
