const baseError='Time limit exceed'
const baseSuccess='the file you have requested has Successfully fetched'
const readFromDir='-+-Reading from the directory-->'
const error='There is an error -->'
const dataAdded='Data written successfully'
const userExists='User is already present'
const invalidInput='The data provided in the input is not suffcient,please provide the necessary data'
const userlogin={
    userDoesNotExists:"The user does not exists",
    userPassDontMatch:"User password dont match",
    RolehasAssigned:"The role has been assigned",
    AuthorisationFailed:"Authorisation has Failed",
    tokenExpired:"Token expired"
}


module.exports={
    baseSuccess:baseSuccess,
    baseError:baseError,
    readFromDir,
    error,
    dataAdded,
    userExists,
    invalidInput,
    userlogin
}
