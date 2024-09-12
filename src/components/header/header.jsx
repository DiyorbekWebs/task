import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Vazifa</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/products" className="text-white hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-white hover:text-gray-300">
              Users
            </Link>
          </li>
          <li>
            <Link to="/todos" className="text-white hover:text-gray-300">
              Todos
            </Link>
          </li>
          <li>
            <Link to="/posts" className="text-white hover:text-gray-300">
              Posts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
