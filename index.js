// Import the appropriate class
// const { WebhookClient } = require('dialogflow-fulfillment');

//Create an instance
// const agent = new WebhookClient({ request: request, response: response });

// Initialize Firebase
const firebase = require('firebase')
var config = {
    apiKey: "AIzaSyAnP-qUqcXdpsPdXIoftiadXv5RzebL7Bw",
    authDomain: "phoenix-5b28a.firebaseapp.com",
    databaseURL: "https://phoenix-5b28a.firebaseio.com",
    projectId: "phoenix-5b28a",
    storageBucket: "phoenix-5b28a.appspot.com",
    messagingSenderId: "312466218791"
};
firebase.initializeApp(config);

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://phoenix-5b28a.firebaseio.com'
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-       functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Fire!");
    console.log('I am a log entry!')
})

// You can find your project ID in your Dialogflow agent settings
// const projectId = 'ENTER_PROJECT_ID_HERE'; //https://dialogflow.com/docs/agents#settings
// const sessionId = 'quickstart-session-id';
// const query = 'hello';
// const languageCode = 'pt-BR';

// Instantiate a DialogFlow client.
// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();

// Define session path
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
// const request = {
//     session: sessionPath,
//     queryInput: {
//         text: {
//             text: query,
//             languageCode: languageCode,
//         },
//     },
// };

// Send request and log result
// sessionClient
//     .detectIntent(request)
//     .then(responses => {
//         console.log('Detected intent');
//         const result = responses[0].queryResult;
//         console.log(`  Query: ${result.queryText}`);
//         console.log(`  Response: ${result.fulfillmentText}`);
//         if (result.intent) {
//             console.log(`  Intent: ${result.intent.displayName}`);
//         } else {
//             console.log(`  No intent matched.`);
//         }
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });