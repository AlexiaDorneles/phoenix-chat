module.exports = (controller) => {
    controller.studio.validate('fb hello', 'username', function (convo, next) {
        console.log('passei aqui')
        var value = convo.extractResponse('username')
        convo.sayFirst(`Adorei o seu nome, ${value}!`)
        next()
    })
}