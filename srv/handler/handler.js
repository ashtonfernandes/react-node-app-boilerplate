const USERS = require('./users/users.json');

class Handler {
    constructor() {
    }

    validateUser(username, password) {
        return new Promise((resolve, reject) => {
            if (USERS[username] && USERS[username].password === password) {
                let profile = Object.assign({}, USERS[username]);
                delete profile.password;
                resolve(profile);
            } else {
                reject(401);
            }
        })

    }
}

module.exports = Handler;
