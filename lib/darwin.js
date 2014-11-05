(function() {
    'use strict';
    
    var spawnify    = require('spawnify');
    
    module.exports  = function(callback) {
        var CMD     = 'dscl . -list /Users UniqueID | sort -nk 2',
            spawn   = spawnify(CMD);
        
        spawn.on('error', function(error) {
            callback(error);
        });
        
        spawn.on('data', function(data) {
            var users = {};
            
            data.split('\n')
                .forEach(function(item) {
                    var data    = item.split(' '),
                        n       = data.length - 1,
                        id      = data[n],
                        name    = data[0];
                    
                    if (id)
                        users[id] = name;
                });
            
            callback(null, users);
        });
    };

})();
