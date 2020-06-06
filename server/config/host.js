const port = process.env.PORT || 8081

const domain = process.env.NODE_ENV === 'development'
  ? `http://localhost:${port}`
  : 'https://programming-quotes-api.herokuapp.com'

module.exports = {
  port,
  domain,
}
