import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      landing: {
        title: 'Ready to start your journey?',
        button: "Let's Begin!",
      },
      questions: {
        'I think about money all the time': 'I think about money all the time',
        'My financial situation is stable': 'My financial situation is stable',
      },
      options: {
        'This is so me 😂': 'This is so me 😂',
        'Almost there 😊': 'Almost there 😊',
        'Not always 😕': 'Not always 😕',
        'Rarely 😭': 'Rarely 😭',
      },
      completion: {
        title: '🎉 Woohoo! 🎉',
        subtitle: "You're absolutely amazing!",
        ready: 'Ready to start your journey?',
        button: "Let's Go!",
      },
      email: {
        title: 'Last step! Share your email to get your results',
        placeholder: 'your@email.com',
        button: 'Show My Results',
      },
    },
  },
  uk: {
    translation: {
      landing: {
        title: 'Готові почати свою подорож?',
        button: 'Почнімо!',
      },
      questions: {
        'I think about money all the time': 'Я постійно думаю про гроші',
        'My financial situation is stable': 'Моя фінансова ситуація стабільна',
      },
      options: {
        'This is so me 😂': 'Це про мене 😂',
        'Almost there 😊': 'Вже майже так 😊',
        'Not always 😕': 'Не завжди 😕',
        'Rarely 😭': 'Дуже мало 😭',
      },
      completion: {
        title: '🎉 Ура! 🎉',
        subtitle: 'Ви неймовірні!',
        ready: 'Готові почати свою подорож?',
        button: 'Вперед!',
      },
      email: {
        title: 'Останній крок! Поділіться своєю поштою щоб отримати результати',
        placeholder: 'ваша@пошта.com',
        button: 'Показати мої результати',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['path'],
    lookupFromPathIndex: 0,
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
