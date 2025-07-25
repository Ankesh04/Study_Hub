import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">StudyHub</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/subjects">Subjects</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/blog">Blog</Link></li>

        {user ? (
          <li className="user-menu" ref={dropdownRef}>
            <div
              className="avatar-container"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="avatar avatar-img"
                />
              ) : (
                <div className="avatar">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <strong>{user.displayName}</strong>
                  <p>{user.email}</p>
                </div>
                
                {/* 👇 Progress Tracker link added */}
                <Link to="/progress-tracker" className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                  📈Progress Tracker
                </Link>
                <Link to="/my-notes" className="dropdown-link">📝My Notes</Link>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li><Link className="login-link" to="/login">Log In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
