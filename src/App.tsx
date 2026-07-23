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

  // NEW
  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  // Load Expenses
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

  // Add Expense
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Delete Expense
  const deleteExpense = (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this expense?"
      )
    ) {
      return;
    }

    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  // NEW - Start Editing
  const editExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  // NEW - Update Expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  // NEW - Cancel Edit
  const cancelEdit = () => {
    setEditingExpense(null);
  };

  // Filter
  const filteredExpenses = expenses.filter(
    (expense) =>
      (category === "" ||
        expense.category === category) &&
      expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Dashboard Stats
  const totalExpense = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highestExpense =
    filteredExpenses.length > 0
      ? Math.max(
          ...filteredExpenses.map(
            (expense) => expense.amount
          )
        )
      : 0;

  const monthlyTotal = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
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
          editingExpense={editingExpense}
          onUpdateExpense={updateExpense}
          onCancelEdit={cancelEdit}
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
          onEditExpense={editExpense}
        />

      </div>
    </div>
  );
}

export default App;