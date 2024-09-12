import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import Products from './components/products/products';
import Users from './components/users/users';
import Posts from './components/post/post';
import Todos from './components/todos/todos';
import Auth from './components/auth/login';
import "./index.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
