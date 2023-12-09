import React, { useEffect, useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import './AdminPage.css'

const AdminPage = ({ onPageChange }) => {
  const { user, logoutUser } = useUser();
  const [userData, setUserData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/login');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchTotalVotes = async () => {
      try {
        const response = await fetch('https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/votes');
        if (response.ok) {
          const votes = await response.json();
          setTotalVotes(votes.length);
        }
      } catch (error) {
        console.error('Error fetching total votes:', error.message);
      }
    };

    fetchUserData();
    fetchTotalVotes();
  }, []);

  return (
    <div className='admin-page'>
      <h2>Admin Page</h2>
      {user && (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logoutUser}>Logout</button>
          <p>Total Votes: {totalVotes}</p>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Voting Status</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((userData) => (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                  <td>Voted/Not Voted (Implement logic based on your app)</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => onPageChange('voting')}>Go to Voting Page</button>
        </>
      )}
    </div>
  );
};

export default AdminPage;