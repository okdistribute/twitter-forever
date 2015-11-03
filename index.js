var util = require('util')
var Twitter = require('twitter')
var events = require('events')
var debug = require('debug')('tweet-search')

module.exports = Forever

function Forever (clientOpts, opts) {
  if (!(this instanceof Forever)) return new Forever(clientOpts, opts)
  debug('waiting for 5 sec')
  this.client = new Twitter(clientOpts)
  this.doit(opts)
  events.EventEmitter.call(this)
}

util.inherits(Forever, events.EventEmitter)

Forever.prototype.doit = function (opts) {
  var self = this
  setTimeout(function () {
    self.search(opts, function (err, since_id) {
      if (err) console.error(err)
      opts.since_id = since_id
      self.doit(opts)
    })
  }, 5000)
}

Forever.prototype.search = function (opts, cb) {
  var self = this
  debug('searching for', opts)
  opts.result_type = 'recent'
  self.client.get('search/tweets', opts, function (err, data, response) {
    if (err) {
      if (err[0].code === 88) {
        self.client.get('application/rate_limit_status', {resources: 'search'}, function (err, data, resp) {
          if (err) self.emit('error', err)
          var reset = data.resources.search['/search/tweets'].reset
          var diff = new Date(reset * 1000) - new Date() + 500
          debug('waiting for', diff / 1000, 'sec')
          return setTimeout(function () { cb(null, opts.since_id) }, diff)
        })
      }
      return self.emit('error', err)
    }
    debug('got', data.statuses.length, 'tweets')
    if (data.statuses.length === 0) return cb(null, opts.since_id)
    self.emit('data', data.statuses)
    return cb(null, data.statuses[0].id)
  })
}
