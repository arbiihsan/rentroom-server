const { Op } = require('sequelize')
const { User, Type, Lodging, History, Bookmark } = require('../models')
const axios = require('axios')

class LodgingController {
    static test(req, res) {
        res.send('ini test')
    }
    static async addLodging(req, res, next) {
        // res.send('masuk')
        const { name, facility, roomCapacity, imgUrl, location, price, typeId } = req.body

        try {
            const newLodging = await Lodging.create({
                name,
                facility,
                roomCapacity,
                imgUrl,
                authorId: req.user.id,
                location,
                price,
                typeId,
                status: 'Active'
            })
            // console.log(req.user);
            await History.create({
                name: newLodging.name,
                description: `New Lodging with Id ${newLodging.id} created`,
                updatedBy: req.user.name
            })

            res.status(201).json({
                newLodging
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async showAllLodging(req, res, next) {
        try {
            const lodgings = await Lodging.findAll({
                include: [User, Type]
            })
            res.status(200).json({
                lodgings
            })
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
    static async showLodgingById(req, res, next) {
        const { id } = req.params
        try {
            const lodging = await Lodging.findByPk(
                id,
                { include: [User, Type] }
            )
            if (!lodging) {
                throw { name: 'ErrorNotFound' }
            } else {
                res.status(200).json({
                    lodging
                })
            }
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
    static async deleteLodging(req, res, next) {
        // console.log('masuk');
        try {
            const { id } = req.params
            const lodgingById = await Lodging.findByPk(id)
            const deletedLodging = await Lodging.destroy({
                where: {
                    id: +id
                }
            })

            if (!deletedLodging) {
                throw { name: "ErrorNotFound" }
            }

            res.status(200).json({
                message: `${lodgingById.name} has been deleted`
            })

        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
    static async showAllHistory(req, res, next) {
        try {
            const histories = await History.findAll({
                order: [
                    ["createdAt", "DESC"]
                ]
            })
            res.status(200).json({
                histories: histories
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async updateLodging(req, res, next) {
        const { id } = req.params
        const { name, facility, roomCapacity, imgUrl, location, price, typeId } = req.body
        // console.log(name, facility, roomCapacity, imgUrl, location, price, typeId, "<<<di controller");
        try {
            const lodgingById = await Lodging.findByPk(id)
            const [updatedLodging] = await Lodging.update({
                name,
                facility,
                roomCapacity: +roomCapacity,
                imgUrl,
                location,
                price: +price,
                typeId: +typeId,
                status: 'Active'
            },
                {
                    where: { id: id }
                })

            if (!updatedLodging) {
                throw { name: "ErrorNotFound" }
            } else {
                await History.create({
                    name: lodgingById.name,
                    description: `Lodging with id ${lodgingById.id} has been updated`,
                    updatedBy: req.user.name
                })
                res.status(201).json({
                    message: `Lodging with id ${lodgingById.id} has been updated`
                })
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async updateLodgingStatus(req, res, next) {
        const { id } = req.params
        const { status } = req.body
        // console.log(req.user);

        // console.log(id, status, '<<<dari controller');
        try {
            const lodgingById = await Lodging.findByPk(id)
            const [updatedStatus] = await Lodging.update(
                { status: status },
                { where: { id: id } }
            )

            if (!updatedStatus) {
                throw { name: "ErrorNotFound" }
            } else {
                await History.create({
                    name: lodgingById.name,
                    description: `Lodging with id ${id}, has been updated to ${status}`,
                    updatedBy: req.user.name
                })
                res.status(201).json({
                    message: `Lodging with id ${lodgingById.id} has been updated`
                })
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async showAllLodgingCustomer(req, res, next) {
        const { searchByLocation, filterByTypeId, page = 1, limit = 9 } = req.query
        // console.log(searchByLocation,"<<<<INIIII");
        try {
            const offset = (Number(page) - 1) * Number(limit)

            let filter = {
                status: "Active"
            }

            if (searchByLocation) {
                filter = {
                    ...filter,
                    location: {
                        [Op.iLike]: `%${searchByLocation}%`
                    }
                }
            }

            if (filterByTypeId) {
                filter = {
                    ...filter,
                    typeId: filterByTypeId
                }
            }

            const { count, rows } = await Lodging.findAndCountAll({
                include: [User, Type],
                order: [
                    ["createdAt", "DESC"]
                ],
                limit,
                offset: offset,
                where: filter
            });

            res.status(200).json({
                currentPage: page,
                totalPage: Math.ceil(count / Number(limit)),
                data: rows
            });
        } catch (err) {
            // console.log(err);
            next(err)
        }

    }
    static async addBookMark(req, res, next) {
        const { lodgingId } = req.params
        // console.log(req.params, "<<<<di controller");
        try {
            const existBookmark = await Bookmark.findOne({
                where: {
                    authorId: req.user.id,
                    lodgingId: lodgingId
                }
            })

            if (existBookmark) {
                throw { name: "ErrorBookmarkExist" }
            }

            const bookmark = await Bookmark.create({
                authorId: req.user.id,
                lodgingId: +lodgingId
            })

            if (!bookmark) throw { name: "ErrorNotFound" }

            res.status(201).json({
                message: "Success add bookmark"
            })
        } catch (err) {
            console.log(err.name);
            next(err)
        }
    }

    static async bookmarkList(req, res, next) {
        try {
            const bookmark = await Bookmark.findAll({
                where: {
                    authorId: req.user.id
                },
                include: [
                    {
                        model: Lodging,
                        include: [Type]
                    }
                ]
            })
            console.log(bookmark);
            res.status(200).json(bookmark)
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteBookmark(req, res, next) {
        const { lodgingId } = req.params
        // console.log(lodgingId, '<<<<<nihhhh');
        try {
            const deletedBookmark = await Bookmark.findOne({
                where: {
                    id: +lodgingId
                },
                include: [Lodging]
            })

            // console.log(deletedBookmark, '<<<<INIIII');
            await Bookmark.destroy({
                where: {
                    id: +lodgingId
                }
            })
            // console.log(deletedBookmark);
            res.status(200).json({ message: `success delete ${deletedBookmark.Lodging.name}`, data: deletedBookmark })
        } catch (err) {
            //   console.log(err)  
            next(err)
        }
    }

    static async generateQr(req, res, next) {
        try {
            const { qr_code_text } = req.body;
            // console.log(req.body, '<<<<di controller');
            const accessToken = 'WicicsTbvaTYL_G_nS56x1ig_Jm5YQRh-5eckKub4_yxjRFLu71BlQ8sN2aSyapd';
            const response = await axios.post(
                `https://api.qr-code-generator.com/v1/create?access-token=${accessToken}`,
                {
                    frame_name: "no-frame",
                    qr_code_text: qr_code_text,
                    image_format: "SVG",
                    qr_code_logo: "scan-me-square",
                    background_color: "#ffffff",
                    foreground_color: "#fa6e79",
                }
            );
            res.send(response.data);
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = LodgingController