import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    ns: '',
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
