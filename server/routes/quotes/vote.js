const User = require('../../models/User')

module.exports = async(req, res) => {
  const {quoteId, newVote, lang} = req.body
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
    quote.save(async err => {
      if (err) return res.status(500).send(err.message)
      if (user) User.update({_id: user._id}, {$addToSet: {voted: quoteId}})
      const text = quote.en
      const query = { [lang]: { $ne: '' } }
      const split = text.split(' ')
      let negationText = ''
      split.forEach(element => {
        negationText  = negationText.concat('-', element, ' ')
      })
      let result = {}
      if(newVote >= 3) {
        console.log('ok voted up')
        result.similar = 'You might also like'
        result.quote = await Quote
          .find({$text: {$search: text}}, {score: {$meta: 'textScore'}})
          .sort({ score: {$meta: 'textScore'}}).skip(1).limit(1)
      }
      else if (newVote < 3) {
        result.similar = 'You disliked previous quote so maybe you will like this'
        result = await Quote
          .find({$text: {$search: negationText}}, {score: {$meta: 'textScore'}})
          .sort({ score: {$meta: 'textScore'}}).limit(1)
          .then(quotes => {
            if(quotes.length == 0)
              result = Quote
                .countDocuments(query)
                .exec((err, n) => {
                  const rand = Math.floor(Math.random() * n)
                  Quote
                    .findOne(query)
                    // .select({ author: 1, [lang]: 1 })
                    .skip(rand)
                    .exec((err, quote) => quote)
                })
            else
              return quotes
          })
          .catch(e => {
            console.log(e)
            result = null
          })
      }

      res.send({message: 'SUCCESS_SAVED', quote, similarQuote: result})
    })
  } catch (e) {
    console.log(e)
    res.send({message: e.message })
  }
}

// async function getSimilar(lang, text, vote, res) {
//   const { Quote } = res.locals
//   const query = { [lang]: { $ne: '' } }
//   const split = text.split(' ')
//   let negationText = ''
//   split.forEach(element => {
//     negationText  = negationText.concat('-', element, ' ')
//   })
//   let result = {}
//   if(vote >= 3) {
//     result.similar = 'You might also like'
//     result.quote = Quote
//       .find({$text: {$search: text}}, {score: {$meta: 'textScore'}})
//       .sort({ score: {$meta: 'textScore'}}).skip(1).limit(1)
//   }
//   else if (vote < 3) {
//     result.similar = 'You disliked previous quote so maybe you will like this'
//     result = Quote
//       .find({$text: {$search: negationText}}, {score: {$meta: 'textScore'}})
//       .sort({ score: {$meta: 'textScore'}}).limit(1)
//       .then(quotes => {
//         if(quotes.length == 0)
//           result = Quote
//             .countDocuments(query)
//             .exec((err, n) => {
//               const rand = Math.floor(Math.random() * n)
//               Quote
//                 .findOne(query)
//                 // .select({ author: 1, [lang]: 1 })
//                 .skip(rand)
//                 .exec((err, quote) => quote)
//             })
//         else
//           result = quotes

//       })
//       .catch(e => {
//         console.log(e)
//         result = null
//       })
//   }
//   return result
// }