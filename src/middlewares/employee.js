let responseBuilder = require('../helper/responseBuilder')
let constant = require('../helper/constant')


function signupValidator(req, res, next) {
    let body = req.body;
    if (!body.name || !body.dob || !body.password || !body.email) {
        let resp = responseBuilder.error(constant.invalidInput)
        res.send(resp);
    }
    else
        next()
}
function logInvalidator(req, res, next) {
    let body = req.body
    if (!body.password || !body.email) {
        let resp = responseBuilder.error(constant.invalidInput)
        res.send(resp);
    }
    else
        next()
}


module.exports = {
    signupValidator,
    logInvalidator
}

