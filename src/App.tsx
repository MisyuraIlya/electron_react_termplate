import React, { useState } from 'react';
import './App.css';


function App() {
  const ipcRenderer = (window as any).ipcRenderer;
  const [test, setTest] = useState('')
  const handleSubmit = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        ipcRenderer.on('submit:todoForm:response', (event:any, response:any) => {
          resolve(response);
        });

        ipcRenderer.send('submit:todoForm', 'hello world');
      });

      console.log('Result from main process:', result);
      setTest(result as string)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-2">
    <h1>hello world</h1>
      <button onClick={() => handleSubmit()}>
        click
      </button>
      <p>
        result: {test}
      </p>
    </div>
  );
}

export default App;
