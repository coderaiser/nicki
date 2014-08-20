Nicki
=========

Get names of users by uids from /etc/passwd.

## Install

`npm i nicki --save`

## Hot to use?

```js
var nicki = require('nicki');

nicki(function(error, names) {
    console.log(error || names);
}

/*
 * Could be something like this
{ 
  '0': 'root',
  '1': 'daemon',
  '2': 'bin',
  '3': 'sys',
  '4': 'sync',
  '5': 'games',
  '6': 'man',
  '7': 'lp',
  '8': 'mail',
  '9': 'news',
  '10': 'uucp',
  '13': 'proxy',
  '33': 'www-data',
  '34': 'backup',
  '38': 'list',
  '39': 'irc',
  '41': 'gnats',
  '100': 'libuuid',
  '101': 'syslog',
  '102': 'messagebus',
  '103': 'landscape',
  '104': 'sshd',
  '105': 'colord',
  '106': 'debian-deluged',
}
*/
```

## How it works?

`Nicki` parses `/etc/passwd` and makes object where key is `uid` and value is `name`.

## License

MIT
