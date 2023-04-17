const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const models = require('../models/pengguna');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true,
}));


//action
const getAllPengguna = (request, response) => {
    models.queryAllPengguna()
        .then(data => {
            console.log(data)
            response.status(200).json({
                "message": "Data Pengguna",
                "data": data,
                "status": 200
            })
        })
        .catch(error => console.log(error))
        .catch(error => response.status(500).json(error))
}

const signin = (request, response) => {
    const userREG = request.body
    let user
    if (userREG.username) {
        models.findUser(userREG)
            .then(foundUser => {
                user = foundUser
                if (user) {
                    models.checkPassword(userREG.password, foundUser)
                        .then(() => models.createToken())
                        .then(token => models.updateUserToken(token, user))
                        .then(user => {
                            console.log(user)
                            console.log("Sign in has been Success!")
                            response.status(200).json(user)
                        })

                } else {
                    console.log(`Username ${userREG.username} is not Register, Please Register first before Login!`)
                    return response.send({
                        message: `Username ${userREG.username} is not Register, Please Register first before Login!`
                    }).status(500);
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    }
}

module.exports = {
    getAllPengguna,
    signin
}