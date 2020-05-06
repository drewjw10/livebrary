import React from "react";

const Navbar = () => {
  return (
    <div>
      <header>
        <a className='logo' href=''>
          Livebrary
        </a>
        <nav>
          <ul className='nav__links'>
            <li>
              <a href=''>Find Performances</a>
            </li>
            <li>
              <a href=''>Top Performances</a>
            </li>
            <li>
              <a href=''>Log In</a>
            </li>
            <li>
              <a href=''>Register</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
