import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  
    <App />
  
);