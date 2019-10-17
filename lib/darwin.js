'use strict';

const {promisify} = require('util');
const spawnify = require('spawnify');

module.exports = promisify((callback) => {
    const CMD = 'dscl . -list /Users UniqueID | sort -nk 2';
    const spawn = spawnify(CMD);
    
    spawn.on('error', (error) => {
        callback(error);
    });
    
    let dataAll = '';
    
    spawn.on('data', (data) => {
        dataAll += data;
    });
    
    spawn.on('close', () => {
        callback(null, parse(dataAll));
    });
});

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

