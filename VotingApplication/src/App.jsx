import React, { useState } from 'react';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './components/LoginPage/LoginPage';
import VotingPage from './components/VotingPage/VotingPage';
import AdminPage from './components/AdminPage/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <UserProvider>
      <div>
        {currentPage === 'login' && <LoginPage onPageChange={handlePageChange} />}
        {currentPage === 'voting' && <VotingPage onPageChange={handlePageChange} />}
        {currentPage === 'admin' && <AdminPage onPageChange={handlePageChange} />}
      </div>
    </UserProvider>
  );
}

export default App;