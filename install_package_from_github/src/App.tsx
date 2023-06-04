import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { request } from 'request-dispatch';

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    request.get<any>('http://server.pcrpallet.com/view/api/orders/order/', {
      onResponse(data) {
          setCount(data.count);
          console.log('data', data);
      },
      onError(error) {
          console.log('error', error)
      },
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Result Request: {count}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
