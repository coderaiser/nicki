# Nicki [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/nicki.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/ischanged/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/ischanged/workflows/Node%20CI/badge.svg
[DependencyStatusIMGURL]: https://img.shields.io/david/coderaiser/nicki.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/nicki "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/nicki "Dependency Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

Get names of users by uids from `/etc/passwd` (or from `dscl` on `darwin`).

## Install

`npm i nicki --save`

## Hot to use?

```js
const nicki = require('nicki');
const names = await nicki();

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
