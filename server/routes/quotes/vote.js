const User = require('../../models/User')

module.exports = async(req, res) => {
  const {quoteId, newVote} = req.body
  console.log(req.body.quoteId)
  const { Quote, user } = res.locals
  if (newVote > 5 || newVote < 1) return res.status(400).send({message: 'Invalid vote'})

  try {
    console.log(`yeah:${quoteId}`)
    const quote = await Quote.findById(quoteId)
    console.log(`found one:${quote}`)
    const { rating, numberOfVotes } = quote
    
    const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
    quote.rating = newRating.toFixed(1)
    quote.save(err => {
      if (err) return res.status(500).send(err.message)
      if (user) User.update({_id: user._id}, {$addToSet: {voted: quoteId}})
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  } catch (e) {
    console.log(e)
    res.send({message: e.message })
  }
}
