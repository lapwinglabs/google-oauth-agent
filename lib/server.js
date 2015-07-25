/**
 * Module dependencies
 */

var superagent = require('superagent');
var assert = require('assert');

/**
 * Export `Google`
 */

module.exports = Google;

/**
 * Access Token Endpoint
 */

var access_token_endpoint = 'https://accounts.google.com/o/oauth2/token';

/**
 * API Endpoint
 */

var api_endpoint = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

/**
 * Initialize `Google`
 */

function Google(obj, fn) {
  assert(obj.code, 'google authentication requires a "code"');
  assert(obj.client_id, 'google authentication requires a "client_id"');
  assert(obj.client_secret, 'google authentication requires a "client_secret"');
  assert(obj.redirect_uri, 'google authentication requires a "redirect_uri"');

  var query = {
    code: obj.code,
    client_id: obj.client_id,
    client_secret: obj.client_secret,
    redirect_uri: obj.redirect_uri,
    grant_type: 'authorization_code'
  };

  // get the access token and request the profile
  fetch_token(query, function(err, token) {
    if (err) return fn(err);
    fetch_profile(token, fn);
  })
}

/**
 * Get the token
 */

function fetch_token(obj, fn) {
  superagent
    .post(access_token_endpoint)
    .accept('json')
    .type('form')
    .send(obj)
    .end(function(err, res) {
      if (!res.ok) return fn(new Error(res.body.error_description));
      return fn(null, res.body.access_token);
    });
}

/**
 * Fetch profile
 */

function fetch_profile(token, fn) {
  superagent
    .get(api_endpoint)
    .accept('json')
    .set('Authorization', 'Bearer ' + token)
    .end(function(err, res) {
      if (!res.ok) return fn(new Error(res.body.error_description));
      return fn(null, res.body);
    })
}
