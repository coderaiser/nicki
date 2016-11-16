'use strict';

const spawnify = require('spawnify/legacy');

module.exports = (callback) => {
    const CMD = 'dscl . -list /Users UniqueID | sort -nk 2';
    const spawn = spawnify(CMD);
    
    spawn.on('error', function(error) {
        callback(error);
    });
    
    let dataAll = '';
    
    spawn.on('data', function(data) {
        dataAll += data;
    });
    
    spawn.on('close', function() {
        const users = {};
        
        dataAll
            .split('\n')
            .forEach((item) => {
                const data = item.split(' ');
                const n = data.length - 1;
                const id = data[n];
                const name = data[0];
                
                if (!id)
                    return;
                
                users[id] = name;
            });
        
        callback(null, users);
    });
};

