'use strict';

var phoneBook = [];

module.exports.add = function add(name, phone, email) {
    if (isValidPhone(phone) && isValidEmail(email) &&
        typeof (name) === 'string' && name.length !== 0
    ) {
        var phoneBookRecord = {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(phoneBookRecord);
    }
};

function isValidPhone(phone) {
    var validPhoneRegexp
        = /^(\+?\d{1,2})? ?(\(\d{3}\)|\d{3}) ?(\d{7}|\d{3}-\d-\d{3}|\d{3} \d \d{3})$/;
    return validPhoneRegexp.test(phone);
}

function isValidEmail(email) {
    var validEmailRegexp
        = /^[a-zA-Z0-9._-]+@(([a-zA-Z0-9_-]+\.)+[a-zA-Z]+)|(([а-яА-Я0-9_-]+\.)+[а-яА-Я]+)$/;
    return validEmailRegexp.test(email);
}

module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        if (query === undefined ||
            phoneBookRecord.name.indexOf(query) != -1 ||
            phoneBookRecord.phone.indexOf(query) != -1 ||
            phoneBookRecord.email.indexOf(query) != -1
        ) {
            console.log(
                phoneBookRecord.name + ', ' +
                phoneBookRecord.phone + ', ' +
                phoneBookRecord.email
            );
        }
    }
};

module.exports.remove = function remove(query) {
    var removedCounter = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        var phoneBookRecord = phoneBook[i];
        if (phoneBookRecord.name.indexOf(query) != -1 ||
            phoneBookRecord.phone.indexOf(query) != -1 ||
            phoneBookRecord.email.indexOf(query) != -1
        ) {
            phoneBook.splice(i, 1);
            i--;
            removedCounter++;
        }
    }
    console.log('Удалено контактов: ' + removedCounter);
};

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
};

module.exports.showTable = function showTable() {

};
