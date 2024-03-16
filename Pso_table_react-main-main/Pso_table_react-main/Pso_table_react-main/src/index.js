import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/app'; // Correct the import path and use default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// import React from 'react';
// import  ReactDOM  from 'react-dom/client';
// import App from './App'; // Correct the import path and use default import

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
  
// );
