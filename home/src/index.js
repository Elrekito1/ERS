import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './Components/SpringIn/AboutMe/about.css';
import './Components/SpringIn/Work/work.css';
import './Components/SpringIn/Contact/contact.css';
import './Components/SpringIn/Work/Coisas/work.json';
import Script from './server/script.js';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Script />
  </React.StrictMode>
);

reportWebVitals();
