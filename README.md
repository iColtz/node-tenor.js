
<div align="center">
    <a href="https://nodei.co/npm/node-tenor.jss/"><img src="https://nodei.co/npm/node-tenor.jss.png?downloads=true" alt="NPM Install Info" /></a>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/node-tenor.jss"><img src="https://img.shields.io/npm/v/node-tenor.jss?style=flat-square" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/node-tenor.jss"><img src="https://img.shields.io/npm/dt/node-tenor.jss?style=flat-square" alt="NPM Downloads" /></a>
    <a href="https://img.shields.io/david/iColtz/node-tenor.jss"><img src="https://img.shields.io/david/iColtz/node-tenor.jss?style=flat-square" alt="Deps" /></a>
  </p>
  <p>
  </p>
</div>

# node-tenor.jss
> node.js library for using tenors public API. Making it easy to: search for GIFs, get the most recent trending GIFs and much more! 

**Installation**
`npm install node-tenor.jss`

## Documentation
Coming soon!
Plus pro dev's use the [source code](https://github.com/iColtz/node-tenor.jss/blob/main/src/lib/TenorClient.js).

## Example
```js
const TenorClient = require('node-tenor.jss');
const client = new TenorClient('API_KEY');

client.search('funny')
  .then((gif) => {
	console.log(gif);
  })
  .catch((error) => {
	console.log(error);
  });
```

## API Key
To get an API key register for an one at the following site: https://tenor.com/developer/keyregistration

## Author
Author: [iColtz](https://github.com/iColtz)