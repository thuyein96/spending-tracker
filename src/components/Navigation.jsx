import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div>
          <Link to="/spending-tracker" className="nav-logo">
            💰 Spending Tracker
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/spending-tracker" className="nav-link">
            🏠 Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            📊 Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
