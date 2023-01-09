import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PropertyProvider} from "./context/context"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PropertyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PropertyProvider>
);
