interface Props {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    searchTerm: string;
    onSearch: (value: string) => void;
  }
  
  function ExpenseFilter({
    selectedCategory,
    onSelectCategory,
    searchTerm,
    onSearch,
  }: Props) {
    return (
      <div className="filter-section">
  
        <input
          type="text"
          placeholder="🔍 Search Expenses..."
          value={searchTerm}
          onChange={(e) =>
            onSearch(e.target.value)
          }
        />
  
        <select
          value={selectedCategory}
          onChange={(e) =>
            onSelectCategory(e.target.value)
          }
        >
          <option value="">
            📂 All Categories
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
  
      </div>
    );
  }
  
  export default ExpenseFilter;