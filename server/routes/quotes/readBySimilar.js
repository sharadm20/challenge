module.exports = (req, res) => {
  const { lang } = req.params
  const { text, vote } = req.body
  const query = { [lang]: { $ne: '' } }
  const split = text.split(' ')
  let negationText = ''
  split.forEach(element => {
    negationText  = negationText.concat('-', element, ' ')
  })
  const { Quote } = res.locals
  if(vote >= 3)
    Quote
      .find({$text: {$search: text}}, {score: {$meta: 'textScore'}})
      .sort({ score: {$meta: 'textScore'}}).skip(1).limit(1)
      .then(quotes => res.send(quotes))
      .catch(e => res.status(500).send({ message:'SERVER_ERROR', error:e.message }))
  else if (vote < 3)
    Quote
      .find({$text: {$search: negationText}}, {score: {$meta: 'textScore'}})
      .sort({ score: {$meta: 'textScore'}}).limit(1)
      .then(quotes => {
        if(quotes.length == 0)
          Quote
            .countDocuments(query)
            .exec((err, n) => {
              const rand = Math.floor(Math.random() * n)
              Quote
                .findOne(query)
              // .select({ author: 1, [lang]: 1 })
                .skip(rand)
                .exec((err, quote) => res.send(quote))
            })
        else
          res.send(quotes)

      })
      .catch(e => res.status(500).send({ message:'SERVER_ERROR', error:e.message }))

}