# twitter-forever

Search twitter forever for a given query. Handles rate limiting.

## CLI Example

Install using npm

```
npm install -g twitter-forever
```

Can take any number of arguments in the form `--name value` where Twitter defines them on their documentation at https://dev.twitter.com/rest/reference/get/search/tweets

```
twitter-forever "my search query" --until 10/22/2012
```

## Node.js Example

```
npm install twitter-forever
```

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

### `forever.on('error', cb)`

`cb` is called with an error.
