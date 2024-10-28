import React from 'react';
import ReactDOM from 'react-dom/client';

import Questionnaire from './components/Questionnaire';
import './index.css';

const initLifeGuideQuestionnaire = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Questionnaire />
      </React.StrictMode>
    );
  }
};

window.initLifeGuideQuestionnaire = initLifeGuideQuestionnaire;