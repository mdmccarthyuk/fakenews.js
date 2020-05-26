const express = require('express');
const app = express();
const news = require('./news.js')

// Handle requests to '/' - return a generated headline
app.get('/', (req, res) => {
    console.log('Fakenews processed a request');
    headline = news.generate_news();

    res.send(`<CENTER><H1>${(headline)}</H1></CENTER>`)
});

// Start the service listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Fakenews listening on port ', port);
});
