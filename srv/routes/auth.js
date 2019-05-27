const { Router } = require('express');

module.exports = (handler) => {

    let api = Router();

    api.post('/', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        handler.validateUser(username, password).then(profile => {
            res.json(profile);
        }, error => {
            res.sendStatus(401);
        })
    });

    return api;
};
