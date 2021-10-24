import './App.css'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import domains from './domains'
import { withTranslation } from 'react-i18next'
import { Component } from 'react'

import ReactCountryFlag from 'react-country-flag'

import ReactGA from 'react-ga'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      domain: '',
      status: '',
      description: '',
      isValid: null,
      locale: 'en-US'
    }

    this.updateInput = this.updateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateLocale = this.updateLocale.bind(this)
  }

  componentDidMount () {
    const { i18n } = this.props

    i18n.changeLanguage(this.state.locale)

    ReactGA.initialize('G-7MF8HNHZJH')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  updateInput (event) {
    this.setState({ domain: event.target.value })
  }

  handleSubmit (event) {
    const domain = this.state.domain

    if (!domain) return

    const strippedDomain = this.domainFromUrl(domain)

    const { t } = this.props

    if (domains.includes(strippedDomain)) {
      this.setState({
        status: t('valid', { strippedDomain }),
        isValid: true,
        description: t(strippedDomain)
      })
    } else {
      this.setState({
        status: t('invalid', { strippedDomain }),
        isValid: false
      })
    }
  }

  updateLocale (event) {
    const locale = event.target.getAttribute('value')

    this.setState({ locale })

    const { i18n } = this.props

    i18n.changeLanguage(locale)
  }

  domainFromUrl (url) {
    var result
    var match
    if (
      (match = url.match(
        // eslint-disable-next-line
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
      ))
    ) {
      result = match[1]
      // eslint-disable-next-line
      if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
        result = match[1]
      }
    }
    return result.toLowerCase()
  }

  render () {
    const { t } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Discord Domain Checker</h1>
          <br />
          <p>{t('description')}</p>
          <br />
          <input
            className='input'
            type='text'
            name='domain'
            placeholder='discord.com'
            onChange={this.updateInput}
          />
          <br />
          <h3 className={this.state.isValid?.toString()}>
            {this.state && this.state.status ? this.state.status : ''}<br />
            {this.state && this.state.description ? `${t('domainDescription')}: ${this.state.description}` : ''}
          </h3>
          <br />
          <Button variant='primary' onClick={this.handleSubmit}>
            {t('submit')}
          </Button>
          <br />
          <br />
          <div>
            {/* eslint-disable-next-line */}
            <a id='en-US' href='#' onClick={this.updateLocale}>
              <ReactCountryFlag
                countryCode='US'
                aria-label='English'
                value='en-US'
                svg
              />
            </a>{' '}
            {/* eslint-disable-next-line */}
            <a id='pt-BR' href='#' onClick={this.updateLocale}>
              <ReactCountryFlag
                countryCode='BR'
                aria-label='Portuguese (Brazil)'
                value='pt-BR'
                svg
              />
            </a>
          </div>
        </header>
      </div>
    )
  }
}

export default withTranslation()(App)
