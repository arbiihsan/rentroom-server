const { verifyToken } = require('../helpers/jwt')
const { User, Lodging } = require('../models')

const authentication = async function (req, res, next) {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw { name: 'Unauthenticated' }
        }

        const decoded = verifyToken(access_token)
        // console.log(decoded);

        const findUser = await User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        })
        // console.log(findUser);

        if(!findUser) {
            throw { name: 'Unauthenticated' }
        }
        req.user = {
            id: findUser.id,
            email: findUser.email,
            role: findUser.role,
            name: findUser.username
        }

        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authentication