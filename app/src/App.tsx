import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    console.log('response: ', await response.json());
    return response;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;