'use strict';

const {readFile} = require('fs/promises');

const ischanged = require('ischanged');
const FILE = '/etc/passwd';

const {platform} = process;

const DARWIN = platform === 'darwin';
const WINDOWS = platform === 'win32';

let Names;

module.exports = async () => {
    if (WINDOWS)
        return;
    
    if (DARWIN) {
        if (Names)
            return Names;
        
        const darwin = require('./darwin');
        Names = await darwin();
    }
    
    const is = await ischanged(FILE);
    
    if (is || !Names) {
        const passwd = await readFile(FILE, 'utf8');
        Names = get(passwd);
    }
    
    return Names;
};

module.exports.parse = get;

/** Функция парсит uid и имена пользователей
 * из переданного в строке вычитаного файла /etc/passwd
 * и возвращает массив обьектов имён и uid пользователей
 * @param passwd - строка, в которой находиться файл /etc/passwd
 */
function get(passwd) {
    const users = {};
    
    for (const line of passwd.split('\n')) {
        passwd = passwd.replace(line, '');
        
        /* получаем первое слово строки */
        const name = line.substr(line, line.indexOf(':'));
        const newLine = line.replace(name + ':x:', '');
        
        /* получаем uid */
        const uid = newLine.substr(newLine, newLine.indexOf(':'));
        
        if (!uid)
            continue;
        
        users[uid] = name;
    }
    
    return users;
}

