import { useEffect } from 'react'

export const useAnalytics = () => {
  useEffect(() => {
    const gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZG26M5SPN8'
    document.head.appendChild(gaScript)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-ZG26M5SPN8', {
      user_id: localStorage.getItem('user_email') || undefined,
    })

    return () => {
      document.head.removeChild(gaScript)
    }
  }, [])

  const trackEvent = (eventName, data) => {
    const userEmail = localStorage.getItem('user_email')
    window.gtag('event', eventName, {
      event_category: 'Questionnaire',
      event_label: `${data.question}`,
      answered_by: userEmail,
      user_id: userEmail,
      ...data,
    })
  }

  return { trackEvent }
}
