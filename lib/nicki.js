'use strict';

var fs          = require('fs'),
    
    ischanged   = require('ischanged'),
    FILE        = '/etc/passwd',
    DARWIN      = process.platform === 'darwin',
    Names;

module.exports = function(callback) {
    if (DARWIN)
        if (Names)
            callback(null, Names);
        else
            require('./darwin')(function(error, data) {
                Names = data;
                callback(error, data);
            });
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
            passwd = passwd.replace(line, '');
            
            /* получаем первое слово строки */
            name = line.substr(line, line.indexOf(':'));
            line = line.replace(name + ':x:', '');
            
            /* получаем uid */
            uid = line.substr(line, line.indexOf(':'));
            
            if (uid)
                users[uid] = name;
        });
    
    return users;
}
