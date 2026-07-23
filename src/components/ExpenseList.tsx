import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
  onEditExpense: (expense: Expense) => void;
}

function ExpenseList({
  expenses,
  onDeleteExpense,
  onEditExpense,
}: Props) {

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        📂 No expenses found.
      </div>
    );
  }

  const getCategoryClass = (
    category: string
  ) => {
    switch (category) {
      case "Food":
        return "food";

      case "Transport":
        return "transport";

      case "Education":
        return "education";

      case "Shopping":
        return "shopping";

      default:
        return "other";
    }
  };

  const getCategoryIcon = (
    category: string
  ) => {
    switch (category) {
      case "Food":
        return "🍔";

      case "Transport":
        return "🚗";

      case "Education":
        return "📚";

      case "Shopping":
        return "🛒";

      default:
        return "📦";
    }
  };

  return (
    <div className="expense-list">

      {expenses.map((expense) => (

        <div
          className="expense-item"
          key={expense.id}
        >

          <div className="expense-info">

            <h3>{expense.title}</h3>

            <span
              className={`badge ${getCategoryClass(
                expense.category
              )}`}
            >
              {getCategoryIcon(
                expense.category
              )}{" "}
              {expense.category}
            </span>

            <p className="expense-date">
              📅 {expense.date}
            </p>

          </div>

          <div className="expense-actions">

            <h3>
              PKR{" "}
              {expense.amount.toLocaleString()}
            </h3>

            <div className="action-buttons">

              <button
                className="edit-btn"
                onClick={() =>
                  onEditExpense(expense)
                }
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  onDeleteExpense(expense.id)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ExpenseList;