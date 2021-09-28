import './App.css';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import domains from './domains'
import { Component } from 'react';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = { domain: '', status: '', isValid: null }

    this.updateInput = this.updateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }  

  updateInput (event) {
    this.setState({ domain: event.target.value })
  }

  handleSubmit (event) {
    const domain = this.state.domain

    if (!domain) return;

    const strippedDomain = this.domainFromUrl(domain)

    if (domains.includes(strippedDomain)) {
      this.setState({ status: `${strippedDomain} is a valid Discord domain.`, isValid: true })
    } else {
      this.setState({ status: `${strippedDomain} isn't a valid Discord domain.`, isValid: false })
    }
  }

  domainFromUrl (url) {
    var result
    var match
    // eslint-disable-next-line
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        // eslint-disable-next-line
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result.toLowerCase()
}

  render () {
    return (
      <div className="App">
      <header className="App-header">
        <h1>
          Discord Domain Checker
        </h1>
        <br />
        <p>
          Do you doubt of a website that says its made by Discord? Submit it here:
        </p>
        <br />
        <input className="input" type="text" name="domain" placeholder="discord.com" onChange={this.updateInput} />
        <br />
        <h3 className={this.state.isValid?.toString()}>{(this.state && this.state.status) ? this.state.status : ''}</h3>
        <br />
        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
      </header>
    </div>
    )
  }
}

export default App;
