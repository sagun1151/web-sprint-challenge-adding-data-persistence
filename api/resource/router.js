// build your `/api/resources` router here
const express = require('express');
const Resource = require('./model')

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = await Resource.insert(req.body)
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const data = await Resource.getResources()
        res.json(data)
    } catch (error) {
       next(error) 
    }
} )

module.exports = router;