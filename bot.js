/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Facebook bot built with Botkit.

# RUN THE BOT:
  Follow the instructions here to set up your Facebook app and page:
    -> https://developers.facebook.com/docs/messenger-platform/implementation
  Run your bot from the command line:
    page_token=<MY PAGE TOKEN> verify_token=<MY_VERIFY_TOKEN> node bot.js



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require('node-env-file')
env(__dirname + '/.env')


if (!process.env.page_token) {
  console.log('Error: Specify a Facebook page_token in environment.')
  usage_tip()
  process.exit(1)
}

if (!process.env.verify_token) {
  console.log('Error: Specify a Facebook verify_token in environment.')
  usage_tip()
  process.exit(1)
}

var Botkit = require('botkit')
var debug = require('debug')('botkit:main')

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
  // debug: true,
  verify_token: process.env.verify_token,
  access_token: process.env.page_token,
  studio_token: process.env.studio_token,
  studio_command_uri: process.env.studio_command_uri,
})

// Set up an Express-powered webserver to expose oauth and webhook endpoints
// const webserver = require(__dirname + '/components/express_webserver.js')(controller)

// Tell Facebook to start sending events to this application
require(__dirname + '/components/subscribe_events.js')(controller)

// Set up Facebook "thread settings" such as get started button, persistent menu
require(__dirname + '/components/thread_settings.js')(controller)


// Send an onboarding message when a user activates the bot
require(__dirname + '/components/onboarding.js')(controller)

// Load in some helpers that make running Botkit on Glitch.com better
require(__dirname + '/components/plugin_glitch.js')(controller)

// enable advanced botkit studio metrics
require('botkit-studio-metrics')(controller)

var normalizedPath = require('path').join(__dirname, 'skills')
require('fs').readdirSync(normalizedPath).forEach((file) => {
  require('./skills/' + file)(controller)
})

const customs = require('path').join(__dirname, 'custom')
require('fs').readdirSync(customs).forEach((file) => {
  require('./custom/' + file)(controller)
})


// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
//if (process.env.studio_token) {
controller.on('message_received,facebook_postback', function (bot, message) {
  if (message.text) {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel, message).then(function (convo) {
      if (!convo) {
        // no trigger was matched
        // If you want your bot to respond to every message,
        // define a 'fallback' script in Botkit Studio
        // and uncomment the line below.
        controller.studio.run(bot, 'fallback', message.user, message.channel, message)
      } else {
        // set variables here that are needed for EVERY script
        // use controller.studio.before('script') to set variables specific to a script
        convo.setVar('current_time', new Date())
      }
    }).catch(function (err) {
      if (err) {
        bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err)
        debug('Botkit Studio: ', err)
      }
    })
  }
})
function usage_tip() {
  console.log('~~~~~~~~~~')
  console.log('Botkit Studio Starter Kit')
  console.log('Execute your bot application like this:')
  console.log('page_token=<MY PAGE TOKEN> verify_token=<MY VERIFY TOKEN> studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js')
  console.log('Get Facebook token here: https://developers.facebook.com/docs/messenger-platform/implementation')
  console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
  console.log('~~~~~~~~~~')
}

/*

Botkit Studio Skill module to enhance the "fb hello" script

*/


// define a before hook
// you may define multiple before hooks. they will run in the order they are defined.
// See: https://botkit.ai/docs/readme-studio.html#controllerstudiobefore
controller.studio.before('fb hello', function (convo, next) {

  // do some preparation before the conversation starts...
  // for example, set variables to be used in the message templates
  // convo.setVar('foo','bar')

  console.log('BEFORE: fb hello')
  // don't forget to call next, or your conversation will never continue.
  next()

})

controller.studio.validate('fb hello', 'username', function (convo, next) {

  console.log('passei aqui')
  var value = convo.extractResponse('username')
  convo.sayFirst(`Adorei o seu nome, ${value}!`)
  // test or validate value somehow
  // can call convo.gotoThread() to change direction of conversation

  console.log('VALIDATE: fb hello VARIABLE: username')

  // always call next!
  next()

})

// Validate user input: temporary_value
controller.studio.validate('fb hello', 'temporary_value', function (convo, next) {


  // test or validate value somehow
  // can call convo.gotoThread() to change direction of conversation

  console.log('VALIDATE: fb hello VARIABLE: temporary_value')

  // always call next!
  next()

})

