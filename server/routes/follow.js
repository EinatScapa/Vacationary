const router = require ('express').Router()
const { myQuery } = require('../data_base/db')
const { verify_login } = require('../middleware/auth')

// follow vacation:
router.post('/', verify_login, async (req,res) => {
    try {
        const { v_id, u_id } = req.body
        await myQuery (`
            INSERT INTO followed (v_id, u_id)
            VALUES (${v_id}, ${u_id});
        `)
        await myQuery (`
            UPDATE vacations
            SET followers = followers + 1
            WHERE id = ${v_id};
        `)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})


// unfollow vacation:
router.delete('/', verify_login, async (req,res) => {
    try {
        const { v_id, u_id } = req.body
        await myQuery (`
            DELETE FROM followed
            WHERE v_id = ${v_id} AND u_id = ${u_id};
        `)
        await myQuery (`
            UPDATE vacations
            SET followers = followers - 1
            WHERE id = ${v_id};
        `)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router