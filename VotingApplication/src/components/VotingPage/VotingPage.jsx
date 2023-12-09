import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import './VotingPage.css'

const VotingPage = ({ onPageChange }) => {
  const { user } = useUser();
  const [votingOptions, setVotingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchVotingOptions = async () => {
      try {
        const response = await fetch('https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/voting-options');
        if (response.ok) {
          const options = await response.json();
          setVotingOptions(options);
        } else {
          console.error('Failed to fetch voting options');
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    fetchVotingOptions();
  }, []);

  const handleVote = async () => {
    if (!selectedOption) {
      alert('Please select an option before voting.');
      return;
    }

    // Perform the vote submission logic here, e.g., update the API or other state
    try {
      // Assume your API endpoint for voting is 'https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/vote'
      const response = await fetch('https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, optionId: selectedOption }),
      });

      if (response.ok) {
        setHasVoted(true);
        // Handle successful vote submission, if needed
      } else {
        console.error('Vote submission failed');
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  return (
    <div>
      <h1>Voting Page</h1>
      {user && <p>Welcome, {user.name}!</p>}
      {hasVoted ? (
        <p>You have already voted.</p>
      ) : (
        <>
          <p>Choose your vote:</p>
          <div className="voting-options">
          {votingOptions.map((option) => (
  <div key={option.id} className="voting-card">
    <img src={option.image} alt={option.name} />
    <div className="voting-details">
      <p>{option.name}</p>
      <p className="vote-count">Votes: {option.votes}</p>
    </div>
    <button onClick={() => setSelectedOption(option.id)}>Vote</button>
  </div>
))}
          </div>
          <button onClick={handleVote}>Submit Vote</button>
        </>
      )}
      <button onClick={() => onPageChange('admin')}>Go to Admin Page</button>
    </div>
  );
};

export default VotingPage;