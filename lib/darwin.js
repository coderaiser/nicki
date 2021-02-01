'use strict';

const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

module.exports = async () => {
    const cmd = 'dscl . -list /Users UniqueID | sort -nk 2';
    const {stdout} = await exec(cmd);
    
    return parse(stdout);
};

module.exports.parse = parse;

function parse(dataAll) {
    const users = {};
    
    for (const item of dataAll.split('\n')) {
        const data = item.split(' ');
        const n = data.length - 1;
        const id = data[n];
        const [name] = data;
        
        if (!id)
            continue;
        
        users[id] = name;
    }
    
    return users;
}

