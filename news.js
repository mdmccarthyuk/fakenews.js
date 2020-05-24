const fs = require('fs');
const readline = require('readline');

let data_heads = new Array();
var data_words = new Object();
var data_keys = new Array();

console.log('init news');

const rl_words = readline.createInterface({
    input: fs.createReadStream('./words'),
    crlfDelay: Infinity
});

rl_words.on('line', (line) => {
    let temp_word=line.split("\t");
    if (typeof data_words[temp_word[1]] == 'undefined') {
        data_words[temp_word[1]] = [];
    }
    data_words[temp_word[1]].push(temp_word[0]);
    if (!(data_keys.includes(temp_word[1]))) {
        data_keys.push(temp_word[1]);
    }
})

const rl_heads = readline.createInterface({
    input: fs.createReadStream('./heads'),
    crlfDelay: Infinity
});

rl_heads.on('line', (line) => {
    data_heads.push(line);
})

exports.generate_news = function () {
    let output = new String();
    let raw_headline = new String();
    raw_headline = data_heads[parseInt(Math.random()*data_heads.length)]
    let head_words = raw_headline.split(' ')
    head_words.forEach(word => {
        if(word.startsWith('[')) {
            word = data_words[word.slice(1)][parseInt(Math.random()*data_words[word.slice(1)].length)];
        }
        output = output + `${word} `;
    })
    return output.toUpperCase();
}

if (require.main === module) {
    // Called directly - trigger a test.
    let test = exports.generate_news();
    console.log('lordy')
}
