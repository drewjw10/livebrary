import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <li>
              <Link to='/login'>Log In</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
