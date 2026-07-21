interface Props {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  function Header({ darkMode, toggleDarkMode }: Props) {
    return (
      <header className="header">
        <div>
          <h1>Personal Expense Tracker</h1>
          <p className="subtitle">
            Manage your daily expenses efficiently
          </p>
        </div>
  
        <button
          className="theme-btn"
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>
    );
  }
  
  export default Header;