import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponents';
import ResultTable from './components/ResultTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn react {process.env.NODE_ENV}
        </a>
        <MyComponent />
        <ResultTable />
      </header>
    </div>
  );
}

export default App;
