# fakenews
## Generate fake news from a set of headline templates and word lists.

A GCP Cloud Run and node.js version of my previous AWS Lambda and python based fakenews
project - https://github.com/mdmccarthyuk/fakenews

Written while I was learning JavaScript and about GCP.

The words file contains a tab delimited list of words and categories
The heads file contains a list of headline templates used to build the fake news.

The script reads a word at a time from a randomly selected headline in the heads file.  
If a word is found to start with a '[' symbol the word is looked up in the words file and matched on a random word with
the category given after the '['.  

## Building and deploying

Build a docker image with:
```
gcloud builds submit --tag gcr.io/PROJECT-ID/fakenews
```

Deploy to GCP Cloud run with:
```
gcloud run deploy --image gcr.io/PROJECT-ID/fakenews --platform managed
```
