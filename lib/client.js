/**
 * Module Dependencies
 */

var querystring = require('querystring');
var assign = require('object-assign');
var open = require('oauth-open');
var assert = require('assert');
var isArray = Array.isArray;

/**
 * Export `Google`
 */

module.exports = Google;

/**
 * Base endpoint
 */

var endpoint = 'https://accounts.google.com/o/oauth2/auth';


/**
 * Default options
 */

var defaults = {
  redirect_uri:  window.location.origin || window.location.protocol + '//' + window.location.host,
  scope: ['profile', 'email'],
  display: 'popup'
}

/**
 * Google provider
 */

function Google(obj, fn) {
  obj = assign(defaults, obj);
  assert(obj.client_id, 'google provider requires a "client_id"');

  var url = endpoint + '?' + qs(obj);
  open(url, function(err, data) {
    if (err) return fn(err);
    return fn(null, data.code);
  });
}

/**
 * Scope
 */

function scope(scope) {
  var scope = isArray(scope) ? scope.join(' ') : scope;
  return 'openid ' + scope;
}

/**
 * Build the querystring
 */

function qs(options) {
  return querystring.stringify({
    client_id: options.client_id,
    redirect_uri: options.redirect_uri,
    scope: scope(options.scope),
    display: options.display,
    response_type: 'code'
  });
}
