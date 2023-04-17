const crypto = require('crypto')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'production';
const configuration = require('../knex')[environment];
const database = require('knex')(configuration);

const queryAllPengguna = () => {
    return database.raw("SELECT * FROM master_user ORDER BY nama ASC")
        .then((data) => data.rows)
}

const findUser = (userREG) => {
    return database.raw("SELECT * FROM master_user WHERE nama = ?", [userREG.username])
        .then((data) => data.rows[0])
}

const findByToken = (token) => {
    return database.raw("SELECT * FROM master_user WHERE token = ?", [token])
        .then((data) => data.rows[0])
}

const updateUserToken = (token, user) => {
    return database.raw("UPDATE master_user SET token = ? WHERE nama = ? RETURNING id_user, nama, token", [token, user.nama])
        .then((data) => data.rows[0])
}

const checkPassword = (userREG, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(userREG, foundUser.password, (err, response) => {
            if (err) {
                reject(err)
            } else if (response) {
                resolve(response)
            } else {
                console.log({ message: "Username or Password its Wrong" })
            }
        })
    )
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}



module.exports = {
    queryAllPengguna,
    findUser,
    findByToken,
    checkPassword,
    createToken,
    updateUserToken
}