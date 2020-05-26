const fs = require('fs');
const readline = require('readline');

let data_heads = new Array();
var data_words = new Object();
var data_keys = new Array();

console.log('init news');

// Read the words list
const rl_words = readline.createInterface({
    input: fs.createReadStream('./words'),
    crlfDelay: Infinity
});

// Populate the data_words object by building category keys and adding
// words to an array under the appropriate category
rl_words.on('line', (line) => {
    let temp_word=line.split("\t");
    // If the category key doesn't exist add it and generate an empty array.
    if (typeof data_words[temp_word[1]] == 'undefined') {
        data_words[temp_word[1]] = new Array();
    }
    // Add the word to the object
    data_words[temp_word[1]].push(temp_word[0]);
    // Add a category to the data_keys object if not already present
    if (!(data_keys.includes(temp_word[1]))) {
        data_keys.push(temp_word[1]);
    }
})

// Read the headlines file and populate an array with them.
const rl_heads = readline.createInterface({
    input: fs.createReadStream('./heads'),
    crlfDelay: Infinity
});

rl_heads.on('line', (line) => {
    data_heads.push(line);
})

// Generates a headline based on the populated words and headlines objects.
exports.generate_news = function () {
    let output = new String();
    let raw_headline = new String();
    // Pick a random headline structure from the array
    raw_headline = data_heads[parseInt(Math.random()*data_heads.length)]
    let head_words = raw_headline.split(' ')
    // Parse the words in the headline structure.  Where one starts with '['
    // pull a random word from the named category.
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
    console.log(exports.generate_news());
}
