import React from 'react';
import ReactDOM from 'react-dom/client';

import Questionnaire from './components/Questionnaire';
import './index.css';

const container = document.getElementById('root');

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Questionnaire />
  </React.StrictMode>
);