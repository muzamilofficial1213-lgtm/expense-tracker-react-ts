import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import DashboardCards from "./components/DashboardCards";

import type { Expense } from "./types/Expense";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load Data
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Save Expenses
  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // Save Theme
  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    setExpenses(
      expenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      (category === "" ||
        expense.category === category) &&
      expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const totalExpense = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highestExpense =
    filteredExpenses.length > 0
      ? Math.max(
          ...filteredExpenses.map(
            (e) => e.amount
          )
        )
      : 0;

  const monthlyTotal = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div
      className={
        darkMode
          ? "app dark-mode"
          : "app"
      }
    >
      <div className="container">

        <Header
          darkMode={darkMode}
          toggleDarkMode={() =>
            setDarkMode(!darkMode)
          }
        />

        <DashboardCards
          total={totalExpense}
          count={filteredExpenses.length}
          highest={highestExpense}
          monthlyTotal={monthlyTotal}
        />

        <ExpenseForm
          onAddExpense={addExpense}
        />

        <ExpenseFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={deleteExpense}
        />

      </div>
    </div>
  );
}

export default App;