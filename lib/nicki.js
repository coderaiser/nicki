(function() {
    'use strict';
    
    var fs          = require('fs'),
        spawnify    = require('spawnify'),
        
        ischanged   = require('ischanged'),
        Util        = require('util-io'),
        FILE        = '/etc/passwd',
        DARWIN      = process.platform === 'darwin',
        Names;
    
    module.exports = function(callback) {
        if (DARWIN)
            if (Names)
                callback(null, Names);
            else
                darwin(callback);
        else
            ischanged(FILE, function(error, is) {
                if (error)
                    callback(error);
                else if (is || !Names)
                    read(callback);
                else
                    callback(null, Names);
             });
    };
    
    function read(callback) {
        fs.readFile(FILE, 'utf8', function(error, passwd) {
            if (!error)
                Names   = get(passwd);
            
            callback(error, Names);
        });
    }
    
    
    /** Функция парсит uid и имена пользователей
     * из переданного в строке вычитаного файла /etc/passwd
     * и возвращает массив обьектов имён и uid пользователей
     * @param passwd - строка, в которой находиться файл /etc/passwd
     */
    function get(passwd) {
        var uid, name,
            passwdArray = passwd.split('\n'),
            users   = {};
        
            passwdArray.forEach(function(line) {
                passwd = Util.rmStr(passwd, line);
                
                /* получаем первое слово строки */
                name = line.substr(line, line.indexOf(':'));
                line = Util.rmStr(line, name + ':x:');
                
                /* получаем uid */
                uid = line.substr(line, line.indexOf(':'));
                
                if (uid)
                    users[uid] = name;
            });
        
        return users;
    }
    
    function darwin(callback) {
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
            
            Names = users;
            callback(err, users);
        });
    }
})();
