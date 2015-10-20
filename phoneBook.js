'use strict';

var phoneBook = [];

module.exports.add = function add(name, phone, email) {
    if (isValidPhone(phone) && isValidEmail(email) &&
        typeof name === 'string' && name.length !== 0
    ) {
        var phoneBookRecord = {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(phoneBookRecord);
        return true;
    }
    return false;
};

function isValidPhone(phone) {
    if (typeof phone !== 'string') {
        return false;
    }
    var validPhoneRegexp
        = /^((\+?\d{1,2})? ?(\(\d{3}\)|\d{3}) ?)?(\d{7}|\d{3}-\d-\d{3}|\d{3} \d \d{3})$/;
    return validPhoneRegexp.test(phone);
}

function isValidEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    var validEmailRegexp
        = /^[^@]+@([^@]+\.)+[^@]+$/;
    return validEmailRegexp.test(email);
}

module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        if (query === undefined || recordMatchsQuery(phoneBookRecord, query)) {
            console.log(
                phoneBookRecord.name + ', ' +
                phoneBookRecord.phone + ', ' +
                phoneBookRecord.email
            );
        }
    }
};

module.exports.remove = function remove(query) {
    var recordsRemoved = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        if (recordMatchsQuery(phoneBookRecord, query)) {
            phoneBook.splice(i, 1);
            i--;
            recordsRemoved++;
        }
    }
    console.log('Удалено контактов: ' + recordsRemoved);
};

function recordMatchsQuery(record, query) {
    return record.name.indexOf(query) !== -1 ||
        record.phone.indexOf(query) !== -1 ||
        record.email.indexOf(query) !== -1;
}

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var records = data.split('\n');
    var recordsAdded = 0;
    for (var i = 0; i < records.length; i++) {
        records[i] = records[i].trim();
        if (module.exports.add.apply(this, records[i].split(';'))) {
            recordsAdded++;
        }
    }
    console.log('Добавлено контактов: ' + recordsAdded);
};

module.exports.showTable = function showTable() {
    var maxLength = {
        name: 3,
        phone: 7,
        email: 5
    };
    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        if (phoneBookRecord.name.length > maxLength.name) {
            maxLength.name = phoneBookRecord.name.length;
        }
        if (phoneBookRecord.phone.length > maxLength.phone) {
            maxLength.phone = phoneBookRecord.phone.length;
        }
        if (phoneBookRecord.email.length > maxLength.email) {
            maxLength.email = phoneBookRecord.email.length;
        }
    }
    var table = '';
    table +=
        '┌' + repeatSymbol('─', maxLength.name + 2) +
        '┬' + repeatSymbol('─', maxLength.phone + 2) +
        '╥' + repeatSymbol('─', maxLength.email + 2) +
        '┐\n'
    ;
    table +=
        '│ Имя' + repeatSymbol(' ', maxLength.name - 2) +
        '│ Телефон' + repeatSymbol(' ', maxLength.phone - 6) +
        '║ email' + repeatSymbol(' ', maxLength.email - 4) +
        '│\n'
    ;
    table +=
        '├' + repeatSymbol('─', maxLength.name + 2) +
        '┼' + repeatSymbol('─', maxLength.phone + 2) +
        '╫' + repeatSymbol('─', maxLength.email + 2) +
        '┤\n'
    ;

    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        var spacesNeeded = {
            name: maxLength.name - phoneBookRecord.name.length + 1,
            phone: maxLength.phone - phoneBookRecord.phone.length + 1,
            email: maxLength.email - phoneBookRecord.email.length + 1
        };
        table +=
            '│ ' + phoneBookRecord.name + repeatSymbol(' ', spacesNeeded.name) +
            '│ ' + phoneBookRecord.phone + repeatSymbol(' ', spacesNeeded.phone) +
            '║ ' + phoneBookRecord.email + repeatSymbol(' ', spacesNeeded.email) +
            '│\n'
        ;
    }

    table +=
        '└' + repeatSymbol('─', maxLength.name + 2) +
        '┴' + repeatSymbol('─', maxLength.phone + 2) +
        '╨' + repeatSymbol('─', maxLength.email + 2) +
        '┘\n'
    ;
    console.log(table);
};

function repeatSymbol(symbol, number) {
    var result = '';
    for (var i = 0; i < number; i++) {
        result += symbol;
    }
    return result;
}
