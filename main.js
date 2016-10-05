/**
 * Данные таблицы
 *
 * @type {{}}
 */
var table = {};

/**
 * Ставим событие на изменение поля ввода и добавляем перевод новых слов в таблицу
 */
$(document).ready(function () {
    $('#button').on('click', function () {
        var words = $('#text').val().toLowerCase().replace(/\r|\n/g, ' ').split(' '); // разбиваем стоку по пробелу на отдельные слова

        for (var i = 0; i < words.length; i++) {
            if (words[i] != '') translate(words[i], addToTable);
        }
    });
});

/**
 * Переводит текст с русского на английский язык
 *
 * @param text
 * @param callback
 */
function translate(text, callback) {
    $.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        // Ключ API Яндекс.Переводчика, получить: https://tech.yandex.ru/keys/get/?service=trnsl
        key: 'trnsl.1.1.20160920T135548Z.a3a02726d7d8bf67.aee5aab3baeb217c9f91ab7b3bb782805484adbf',
        text: text,
        lang: 'en',
        format: 'plain'
    }, function(result) {
        callback(text, result.text);
    });
}

/**
 * Добавляет слово и перевод в таблицу на странице
 *
 * @param text
 * @param translation
 */
function addToTable(text, translation) {
    if (table[text] == undefined) {
        table[text] = translation;
        var row = $("<tr>").append('<td>' + text + '</td><td>' + translation + '</td>');
        $('#table').append(row);
    }
}