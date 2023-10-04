const { Type } = require('../models')


class typeController {
    static test(req, res) {
        res.send('ini tes')
    }
    static async showAllTypes(req, res) {
        const types = await Type.findAll()
        res.status(200).json({
            types
        })
        try {

        } catch (err) {
            // console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
    static async addType(req, res, next) {
        const { name } = req.body
        // console.log(name, "<<<< di controller");
        try {
            const newType = await Type.create({
                name
            })
            
            res.status(201).json({
                newType
            })
        } catch (err) {
            // console.log(err)
            next(err)
        }
    }
}

module.exports = typeController