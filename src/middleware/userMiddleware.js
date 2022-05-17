const responseBuilder = require("../helper/responseBuilder");
const encryption = require('../helper/encryption');
const aes256 = require('aes256');
var path = require("path");
var jsonPath = path.join(__dirname, "..", "docs", "users.json");
const jsonFile = require('../helper/jsonFile');
var key = 'HJlsie132334';


function signUpValidator(req, res, next) {
    let body = req.body;
    if (Boolean(body.name) && Boolean(body.phoneNumber) && Boolean(body.email) && Boolean(body.password)) {
        if (validateName(body.name) && validatePhoneNo(body.phoneNumber) && validateEmail(body.email)) {
            if (validatePassword(body.password)) {
                next();
            } else {
                return res.send(responseBuilder.buildFailureResponse("Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter!"));
            }
        } else {
            return res.send(responseBuilder.buildFailureResponse("Request has invalid fields!"));
        }
    } else {
        return res.send(responseBuilder.buildFailureResponse("Request has mandatory fields missing!"));
    }
}

function verifySignupToken(request, response, next) {
    if (!request.query.key) {
        next();
    } else {
        let verificationToken = request.query.token;
        if (!verificationToken) {
            response.send(responseBuilder.buildFailureResponse("Verification token missing!"));
        } else {
            verificationToken = encodeURIComponent(verificationToken);
            let users = jsonFile.getJsonFile(jsonPath);
            let userIndex;
            try {
                let data = encryption.decrypt(decodeURIComponent(verificationToken));
                let loggedInUser = users.find((user) => {
                    if (data.id === user.id) {
                        return true;
                    }
                    return false;
                });
                if (loggedInUser) {
                    if (loggedInUser.verificationToken === verificationToken) {
                        next();
                    } else {
                        response.send(responseBuilder.buildFailureResponse("Invalid registration link/user already registered !"));
                    }
                } else {
                    response.send(responseBuilder.buildFailureResponse("Invalid registration link!"));
                }
            } catch (err) {
                response.send(responseBuilder.buildFailureResponse("Broken registration link!"));
            }
        }
    }
}

function createUserValidator(req, res, next) {
    let body = req.body;
    if (Boolean(body.name) && Boolean(body.phoneNumber) && Boolean(body.email)) {
        if (validateName(body.name) && validatePhoneNo(body.phoneNumber) && validateEmail(body.email)) {
            next();
        } else {
            return res.send(responseBuilder.buildFailureResponse("Request has invalid fields!"));
        }
    } else {
        return res.send(responseBuilder.buildFailureResponse("Request has mandatory fields missing!"));
    }
}

function decrypt(req, res, next) {
    var decryptedData = aes256.decrypt(key, req.body.data);
    req.body = JSON.parse(decryptedData);
    next();
}


function checkAdminRole(req, res, next) {
    let body = req.body;
    if (!body.authToken) {
        return res.send(responseBuilder.buildFailureResponse("Authentication token missing!"));
    } else {
        let data = encryption.decrypt(body.authToken);
        let timeDiff = data.exp - Date.now();
        if (timeDiff < 0) {
            return res.send(responseBuilder.buildFailureResponse("Token expired!"));
        } else if (data.role !== "admin") {
            res.send(responseBuilder.buildFailureResponse("Authentication failed,only admin can assign roles!"));
        }
        else {
            Object.assign(req.body, data);
            next();
        }
    }
}

function tokenAuthenticator(req, res, next) {
    if (!req.headers.authorization) {
        res.send(responseBuilder.buildFailureResponse("Missing authentication token!"));
    } else {
        let data = decrypt(req.headers.authorization);
        let users = jsonFile.getJsonFile(jsonPath);
        let loggedInUser = users.find((user) => {
            if (data.id === user.id) {
                return true;
            }
            return false;
        });
        if (loggedInUser) {
            Object.assign(req.body, loggedInUser);
            next();
        } else {
            res.send(responseBuilder.buildFailureResponse("Invalid Authentication token!"));
        }
    }
}

function decrypt(req, res, next) {
    try {
        var decryptedData = aes256.decrypt(key, req.body.data);
        req.body = JSON.parse(decryptedData);
        next();
    } catch (err) {
        console.log(err);
        res.send(responseBuilder.buildFailureResponse("Invalid Authentication token!"));
    }
}

function validateName(name) {
    if (name[0].toUpperCase() === name[0]) {
        return true;
    } else {
        return false;
    }
}

function validatePhoneNo(phoneNo) {
    var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (mob_regex.test(phoneNo)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    var passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (passwordFormat.test(password)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { signUpValidator, checkAdminRole, decrypt, tokenAuthenticator, createUserValidator, verifySignupToken };