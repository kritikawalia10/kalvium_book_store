import React, { useState, useEffect } from 'react';
import './App.css';

const Form = ({ onRegister, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setsuccess] = useState('');

  const handleRegister = () => {
    const userData = {
      username,
      email,
      password,
    };
  
    onRegister(userData);
    setsuccess('Successfully registered!');
    setTimeout(() => {
      setsuccess('');
      onClose(); 
    }, 2000); 
  };

  return (
    <div className="form">
      <h2>Create Your Account</h2>
      <label>
       
        <input type="text" placeholder='Add your username...' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        
        <input type="email" value={email} placeholder='Enter a valid email...' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
       
        <input type="password" value={password} placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button className = 'submit' onClick={handleRegister}>Submit</button>
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

const BookList = ({ books }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {books.map(book => (
      <div className='book' key={book.id} style={{ border: '2px solid black', padding: '5px', margin: '2%', width: '250px',
      borderRadius: '10px', justifyContent: 'center', alignItems: 'center', height : '500px' }}>

        <img src={book.imageLinks?.thumbnail || 'No Image'} alt={book.title} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        
        <h3>{book.title}</h3>

        <p>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
      </div>
    ))}
  </div>
);

const App = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });

        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleRegister = (userData) => {
    console.log('Registering user:', userData);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
   <>
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="head">
        <h1>Kalvium Book Store</h1>
        <div className="main">
          <input type="search" placeholder='🔍 Search a book' onChange={e => console.log(e.target.value)} />
          <button onClick={toggleForm}>Register</button>
        </div>
      </div>
      {showForm && (
        <Form onRegister={handleRegister} onClose={toggleForm} />
      )}
      <BookList books={books} />
    </div>
   </>
  );
};

export default App;
