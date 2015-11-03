# twitter-forever

Search twitter forever for a given query. Handles rate limiting.

[![NPM](https://nodei.co/npm/twitter-forever.png)](https://nodei.co/npm/twitter-forever/)

```js
var forever = require('twitter-forever')
var client = {
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
}
var searcher = forever(client, {q: 'node.js'})
searcher.on('data', function (tweets) {
  console.log(tweets) // list of tweets from twitter!
})
```

## API

### `var searcher = forever(client, opts)`

```opts```: object. Can take anything that the twitter api takes - `q`,`since`,`until`, etc...

### `searcher.on('data', cb)`

`cb` is called with a list of tweets and their metadata.
