(function() {
    'use strict';
    
    var spawnify    = require('spawnify');
    
    module.exports  = function darwin(callback) {
        var CMD     = 'dscl . -list /Users UniqueID | sort -nk 2';
        
        spawnify(CMD, function(error, json) {
            var err,
                users = {};
            
            if (error)
                err = error;
            else if (json.stderr)
                err = {
                    message: json.stderr
                };
            else
                json.stdout
                    .split('\n')
                    .forEach(function(item) {
                        var data    = item.split(' '),
                            n       = data.length - 1,
                            id      = data[n],
                            name    = data[0];
                        
                        if (id)
                            users[id] = name;
                    });
            
            callback(err, users);
        });
    };

})();
