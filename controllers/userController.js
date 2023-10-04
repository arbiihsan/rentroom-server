const { User } = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static test(req, res) {
        res.send('ini test')
    }
    static async register(req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;
        try {
            // console.log(username, email, password, phoneNumber, address, '<<<<<dari controller');
            const userCreated = await User.create({
                username,
                email,
                password,
                role: 'admin',
                phoneNumber,
                address
            })

            res.status(201).json({
                id: userCreated.id,
                email: userCreated.email
            })
        } catch (err) {
            // console.log(err)
            next(err)
        }
    }
    static async login(req, res, next) {
        // console.log(username, password);
        try {
            const { email, password } = req.body

            if (!email) throw { name: `email can't be empty` }
            if (!password) throw { name: `Password can't be empty` }

            const user = await User.findOne({
                where: {
                    email
                }
            })
            // console.log(user);
            if (!user) throw { name: 'InvalidLogin' }

            const isValidPassword = comparePassword(password, user.password)

            if (!isValidPassword) throw { name: 'InvalidLogin' }
            // console.log('masuk');

            const accessToken = signToken({
                id: user.id,
                email: user.email
            })
            // console.log(user.username);
            res.status(200).json({
                access_token: accessToken,
                username: user.username,
                role: user.role,
                id: user.id
            })
        } catch (err) {
            // console.log(err,'baruuuu');
            next(err)
        }

    }
    static async googleLogin(req, res, next) {
        try {
            let { google_token } = req.headers
            // console.log(google_token);

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "google-login",
                    role: 'staff'
                },
                hooks: false
            })

            const accessToken = signToken({
                id: user.id,
                email: user.email
            })
            // console.log(user.username);
            res.status(200).json({
                access_token: accessToken,
                username: user.username,
                role: user.role,
                id: user.id
            })
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
    static async registerCostumer(req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;
        try {
            // console.log(username, email, password, phoneNumber, address, '<<<<<dari controller');
            const userCreated = await User.create({
                username,
                email,
                password,
                role: 'customer',
                phoneNumber,
                address
            })

            res.status(201).json({
                id: userCreated.id,
                email: userCreated.email
            })
        } catch (err) {
            // console.log(err)
            next(err)
        }
    }
    static async googleLoginCustomer(req, res, next) {
        try {
            let { google_token } = req.headers
            // console.log(google_token);

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "google-login",
                    role: 'customer'
                },
                hooks: false
            })

            const accessToken = signToken({
                id: user.id,
                email: user.email
            })
            // console.log(user.username);
            res.status(200).json({
                access_token: accessToken,
                username: user.username,
                role: user.role,
                id: user.id
            })
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
}

module.exports = UserController