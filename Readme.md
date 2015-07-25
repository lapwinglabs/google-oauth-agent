
# google-oauth-agent

  Bare bones, low-level agent for authenticating with Google's oAuth.

  Uses both a client-side and server-side library to make the oAuth handshake more understandable.

  This library does not make any assumptions about your server-side architecture, allowing it to easily adapt to any setup.

## Example

**client.js**

```js
var Google = require('google-oauth-agent');

// Open popup
Google({
  client_id: client_id,
  scope: 'profile'
}, function(err, code) {
  // send "code" to server.js
})
```

**server.js**

```js
var Google = require('google-oauth-agent');

// received "code" from client
Google({
  code: code,
  client_id: client_id,
  client_secret: client_secret,
  redirect_uri: redirect_uri,
}, function(err, profile) {
  // "profile" will contain your google information
});

```

## Installation

```
npm install google-oauth-agent
```

## Getting the keys

<img src="http://images.google.com/intl/en_ALL/images/srpr/logo6w.png" width="150">
- Visit [Google Cloud Console](https://cloud.google.com/console/project)
- Click **CREATE PROJECT** button
- Enter *Project Name*, then click **CREATE**
- Then select *APIs & auth* from the sidebar and click on *Credentials* tab
- Click **CREATE NEW CLIENT ID** button
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: *http://localhost:3000*
 - **Authorized redirect URI**: *http://localhost:3000*

**Note:** Make sure you have turned on **Contacts API** and **Google+ API** in the *APIs* tab.

## See also:

- [facebook-oauth-agent](https://github.com/lapwinglabs/facebook-oauth-agent)
- [linkedin-oauth-agent](https://github.com/lapwinglabs/linkedin-oauth-agent)
- [twitter-oauth-agent](https://github.com/lapwinglabs/twitter-oauth-agent)

## Credits

Most of this code is distilled from the [satellizer](https://github.com/sahat/satellizer) project.

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
