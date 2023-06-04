import React from 'react';
import RequestComponent from './request/request-component';
import BaseTest from './base64/base_test';

function App() {

  return (
    <div style={{ }}>
      <p>Result Request: </p><RequestComponent />
      <BaseTest />
    </div>
  );
}

export default App;
