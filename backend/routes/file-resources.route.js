const express = require('express')
const router = express.Router()
const {getAllFiles} = require('../controllers/file-resources.controller')

router.get('/', getAllFiles)

module.exports = router