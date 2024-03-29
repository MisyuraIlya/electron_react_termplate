import React from 'react';
import './App.css';


function App() {
  const ipcRenderer = (window as any).ipcRenderer;

  const handleSubmit = (
  ) => {
    ipcRenderer.send('submit:todoForm', 'hello world');
  };

  return (
    <div className="container mt-2">
    <h1>hello world</h1>
      <button onClick={() => handleSubmit()}>
        click
      </button>
    </div>
  );
}

export default App;
