
<div align="center">
    <a href="https://nodei.co/npm/tenor.js/"><img src="https://nodei.co/npm/tenor.js.png?downloads=true" alt="NPM Install Info" /></a>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/tenor.js"><img src="https://img.shields.io/npm/v/tenor.js?style=flat-square" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/tenor.js"><img src="https://img.shields.io/npm/dt/tenor.js?style=flat-square" alt="NPM Downloads" /></a>
    <a href="https://img.shields.io/david/iColtz/tenor.js"><img src="https://img.shields.io/david/iColtz/tenor.js?style=flat-square" alt="Deps" /></a>
  </p>
  <p>
  </p>
</div>

# tenor.js
> node.js library for using tenors public API. Making it easy to: search for GIFs, get the most recent trending GIFs and much more! 

**Installation**
`npm install tenor.js`

## Documentation
Coming soon!
Plus pro dev's use the [source code](https://github.com/iColtz/tenor.js/blob/main/src/lib/TenorClient.js).

## Example
```js
const TenorClient = require('tenor.js');
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