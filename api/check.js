const domains = require('../src/domains.js').default
const enUs = require('../public/locales/en-US.json')

function domainFromUrl (url) {
  var result
  var match
  // eslint-disable-next-line
  if (
    (match = url.match(
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

module.exports = (req, res) => {
  const domain = req.query.domain

  if (!domain)
    return res
      .status(400)
      .json({ error: true, message: 'Missing "domain" query parameter.' })

  const strippedDomain = domainFromUrl(domain)

  if (domains.includes(strippedDomain)) {
    return res.status(200).json({ strippedDomain, isValid: true, description: enUs[strippedDomain] })
  } else {
    return res.status(200).json({ strippedDomain, isValid: false })
  }
}
