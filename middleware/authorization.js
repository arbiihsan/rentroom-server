const { User, Lodging } = require('../models')


const authorizeDeleteLodging = async function (req, res, next) {
    const { id } = req.params
    const lodging = await Lodging.findByPk(+id)

    if(req.user.role === 'admin') {
        next()
    } else if (req.user.role === 'staff') {
        if(lodging.authorId !== req.user.id) {
            return next({ name: 'Forbidden' })
        }
        next()
    } else {
        next({ name: 'forbidden' })
    }
}

const authorizeAdmin = async function (req, res, next) {
    if (req.user.role === 'admin') {
        next()
    } else {
        next({ name: 'forbidden' })
    }
}

const authorizeCustomer = async (req, res, next) => {
    if (req.user.role === "customer") {
      next()
    } else {
      next({ name:"forbidden"})
    }
  }

module.exports = { authorizeDeleteLodging, authorizeAdmin, authorizeCustomer }