// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import "./Navbar.css"
// import { useAuth } from '../store/auth'

// const Navbar = () => {
//   const {isLoggedin}= useAuth();
//   return (
//     <>
//     <header>
//      <div className="container">
//        <div className="logo-brand">
//         <a href="/">AdduTechnical</a>
//        </div>
      
//       <nav>
//         <ul>
//           <li><NavLink to="/">Home</NavLink></li>
//           <li><NavLink to='/about'>About</NavLink></li>
//           <li><NavLink to='/services'>Services</NavLink></li>
//           <li><NavLink to='/contact'>Contact</NavLink></li>
//           {isLoggedin ?<li><NavLink to='/logout'>Logout</NavLink></li> :
//           <>
//          <li><NavLink to='/register'>Register</NavLink></li>
//           <li><NavLink to='/login'>Login</NavLink></li>
//           </>
//           }
//         </ul>
//       </nav>
//       </div>
//     </header>
    
//     </>
//   )
// }

// export default Navbar;



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const { isLoggedin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <a href="/">WebWave</a>
          </div>

          {/* Hamburger menu */}
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>

          {/* Close button (part of hamburger menu) */}
          <div
            className={`close-btn ${menuOpen ? 'active' : ''}`}
            onClick={closeMenu}
          >
            &times;
          </div>

          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={closeMenu}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
              {isLoggedin ? (
                <li>
                  <NavLink to="/logout" onClick={closeMenu}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" onClick={closeMenu}>
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={closeMenu}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;


