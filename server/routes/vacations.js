const router = require ('express').Router()
const { myQuery } = require('../data_base/db')
const { verify_admin, verify_login } = require('../middleware/auth')

// get all vacations
router.get('/', async (req,res) => {
    try {
        const all_vacations = await myQuery (`
            SELECT *
            FROM vacations
        `)
        res.send(all_vacations)
    } catch (error) {
        res.status(500).send(error)
    }
})

// add new vacation (admin only)
router.post('/', verify_admin, async (req,res) => {
    try {
        const { destination, img, from_date, to_date, price } = req.body
        await myQuery (`
            INSERT INTO vacations (destination, img, from_date, to_date, price)
            VALUES ('${destination}','${img}', '${from_date}', '${to_date}', ${price});
        `)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// edit vacation (admin only)
router.put('/', async (req,res) => {
    try {
        const { id, destination, img, from_date, to_date, price } = req.body
        await myQuery (`
            UPDATE vacations
            SET destination='${destination}', img='${img}', from_date='${from_date}', to_date='${to_date}', price=${price}
            WHERE id = ${id};
        `)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete vacation (admin only)
router.delete('/', verify_admin, async (req,res) => {
    try {
        const { id } = req.body
        await myQuery (`
            DELETE
            FROM vacations
            WHERE id = ${id};
        `)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// get id of followed vacations
router.post('/followed', verify_login, async (req,res) => {
    try {
        const { id } = req.body
        const followed_vacations = await myQuery (`
            SELECT v_id
            FROM followed
            WHERE u_id = ${id}
        `)
        res.send(followed_vacations)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router