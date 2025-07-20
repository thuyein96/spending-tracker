import { useState } from "react"
import { useForm } from "react-hook-form"
import categories from "../utils/spending_data.json"
import DataTable from "./DataTable"

const SpendingForm = () => {
  const { register, handleSubmit } = useForm()

  const [isOtherSelected, setIsOtherSelected] = useState(false)
  const [customCategory, setCustomCategory] = useState("")

  const records = window.localStorage.getItem("records") ? JSON.parse(window.localStorage.getItem("records")) : []

  const onSubmit = (data) => {
    console.log(data)

    let categoryName
    if (data.category === "other") {
      categoryName = customCategory || "Other"
    } else {
      const category = categories.find((category) => category.spending_id.toString() === data.category)
      categoryName = category?.category || "Unknown"
    }

    const record = {
      id: records.length + 1,
      name: categoryName,
      amount: data.amount,
      date: data.date,
      month: new Date(data.date).toLocaleString("default", { month: "long" }),
      year: new Date(data.date).getFullYear(),
    }
    console.log(record)
    records.push(record)
    localStorage.setItem("records", JSON.stringify(records))
    alert("Expense added successfully!")
    // Reset custom category state
    setIsOtherSelected(false)
    setCustomCategory("")
    // Reload the page to show updated data
    window.location.reload()
  }

  return (
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
              <input type="date" id="date" {...register("date")} required />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                {...register("category")}
                onChange={(e) => {
                  setIsOtherSelected(e.target.value === "other")
                  if (e.target.value !== "other") {
                    setCustomCategory("")
                  }
                }}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.spending_id}>
                    {category.category}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            {isOtherSelected && (
              <div className="form-group">
                <label htmlFor="customCategory">Custom Category</label>
                <input
                  type="text"
                  id="customCategory"
                  placeholder="Enter custom category name"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  required
                />
              </div>
            )}

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
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Add Expense
            </button>
          </form>
        </div>

        <div className="table-section">
          <h2>Expense Records</h2>
          <DataTable data={records} />
        </div>
      </div>
    </div>
  )
}

export default SpendingForm
