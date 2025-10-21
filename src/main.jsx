import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);

const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXX";
document.head.appendChild(gaScript);

const gaInitScript = document.createElement('script');
gaInitScript.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXX');
`;
document.head.appendChild(gaInitScript);