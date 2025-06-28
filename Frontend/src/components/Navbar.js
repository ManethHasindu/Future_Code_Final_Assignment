import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const styles = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1e1e2f',
      padding: '12px 20px',
      color: '#fff',
      flexWrap: 'wrap',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    brand: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#4dabf7',
      textDecoration: 'none',
    },
    menuToggle: {
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '28px',
      cursor: 'pointer',
      display: isMobile ? 'block' : 'none',
      padding: '0',
      lineHeight: '1',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
    },
    button: {
      padding: '6px 14px',
      backgroundColor: '#e03131',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    mobileMenu: {
      overflow: 'hidden',
      maxHeight: 0,
      flexDirection: 'column',
      width: '100%',
      gap: '12px',
      marginTop: '12px',
      transition: 'max-height 0.3s ease, opacity 0.3s ease',
      opacity: 0,
    },
    showMobile: {
      maxHeight: '500px',
      opacity: 1,
      display: 'flex',
    },
  };

  return (
    <>
      {/* Global CSS to remove margin/padding */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
        }
      `}</style>

      <nav style={styles.navbar} role="navigation" aria-label="Main navigation">
        <Link to="/" style={styles.brand}>Future Code</Link>

        <button
          style={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          ☰
        </button>

        <div
          id="primary-navigation"
          ref={menuRef}
          style={
            isMobile
              ? { ...styles.mobileMenu, ...(isOpen ? styles.showMobile : {}) }
              : styles.navLinks
          }
        >
          {isLoggedIn ? (
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/register" style={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
