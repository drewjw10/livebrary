import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <header>
        <Link to='/' className='logo'>
          Livebrary
        </Link>
        <nav>
          <ul className='nav__links'>
            <li>
              <Link to='/search'>Find Performances</Link>
            </li>
            <li>
              <Link to='/top'>Top Performances</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to='/login'>Log In</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to='/register'>Register</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to='/logout'>Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
