const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var env = require('node-env-file');
env(_dirname + '/.env');

// var Botkit = require('botkit');
// var debug = require('debug')('botkit:main');

// // Create the Botkit controller, which controls all instances of the bot.
// console.log(process.env)
// console.log(__dirname)
// var controller = Botkit.facebookbot({
//     // debug: true,
//     verify_token: process.env.verify_token,
//     access_token: process.env.page_token,
//     studio_token: process.env.studio_token,
//     studio_command_uri: process.env.studio_command_uri,
// });

// // Set up an Express-powered webserver to expose oauth and webhook endpoints
// var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// // Tell Facebook to start sending events to this application
// require(__dirname + '/components/subscribe_events.js')(controller);

// // Set up Facebook "thread settings" such as get started button, persistent menu
// require(__dirname + '/components/thread_settings.js')(controller);


// // Send an onboarding message when a user activates the bot
// require(__dirname + '/components/onboarding.js')(controller);

// // Load in some helpers that make running Botkit on Glitch.com better
// require(__dirname + '/components/plugin_glitch.js')(controller);

// // enable advanced botkit studio metrics
// require('botkit-studio-metrics')(controller);

// var normalizedPath = require("path").join(__dirname, "skills");
// require("fs").readdirSync(normalizedPath).forEach(function (file) {
//     require("./skills/" + file)(controller);
// });


// // This captures and evaluates any message sent to the bot as a DM
// // or sent to the bot in the form "@bot message" and passes it to
// // Botkit Studio to evaluate for trigger words and patterns.
// // If a trigger is matched, the conversation will automatically fire!
// // You can tie into the execution of the script using the functions
// // controller.studio.before, controller.studio.after and controller.studio.validate
// // if (process.env.studio_token) {
// controller.on('message_received,facebook_postback', function (bot, message) {
//     if (message.text) {
//         controller.studio.runTrigger(bot, message.text, message.user, message.channel, message)
//             .then(function (convo) {
//                 if (!convo) {
//                     // no trigger was matched
//                     // If you want your bot to respond to every message,
//                     // define a 'fallback' script in Botkit Studio
//                     // and uncomment the line below.
//                     controller.studio.run(bot, 'fallback', message.user, message.channel, message);
//                 } else {
//                     // set variables here that are needed for EVERY script
//                     // use controller.studio.before('script') to set variables specific to a script
//                     convo.setVar('current_time', new Date());
//                 }
//             }).catch(function (err) {
//                 if (err) {
//                     bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
//                     debug('Botkit Studio: ', err);
//                 }
//             });
//     }
// });

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.send('OK'))
    .get('/facebook/receive', (req, res) => {
        res.send(req.query['hub.challenge']);
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
