var args = require('minimist')(process.argv.slice(2))
var forever = require('./')

args.q = args._[0] || args.q

var client = {
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
}

var searcher = forever(client, args)
searcher.on('data', function (tweets) {
  console.log(tweets.length)
})

searcher.on('error', function (err) {
  console.error(err)
})
