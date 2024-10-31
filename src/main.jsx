import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import Questionnaire from './components/Questionnaire'
import i18n from './lang'

import './index.css'

const container = document.getElementById('root')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Questionnaire />
    </I18nextProvider>
  </React.StrictMode>,
)
