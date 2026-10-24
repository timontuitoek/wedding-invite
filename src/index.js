import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const setFavicon = (faviconPath) => {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = faviconPath;
    document.head.appendChild(newLink);
  } else {
    link.href = faviconPath;
  }
};

setFavicon(`${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();