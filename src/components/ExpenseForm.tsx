import { useState } from "react";
import type { Expense } from "../types/Expense";

interface Props {
  onAddExpense: (expense: Expense) => void;
}

function ExpenseForm({ onAddExpense }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      amount.trim() === "" ||
      category.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      alert(
        "Amount must be greater than zero."
      );
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    onAddExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter Expense Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          Select Category
        </option>

        <option value="Food">
          🍔 Food
        </option>

        <option value="Transport">
          🚗 Transport
        </option>

        <option value="Education">
          📚 Education
        </option>

        <option value="Shopping">
          🛒 Shopping
        </option>

        <option value="Other">
          📦 Other
        </option>
      </select>

      <button type="submit">
        ➕ Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;