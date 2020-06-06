module.exports = (req, res) => {
  const { _id } = req.params
  const { Quote } = res.locals

  Quote.findById(_id)
    .then(quote => res.send({message:`quote by Id ${_id}`, quote}))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
