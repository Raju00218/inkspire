const express = require('express')
const router = express.Router()
const routeControler = require('../controler/routeControler')

router.post('/',routeControler.article_post)
router.get('/',routeControler.article_get)
router.get('/:id',routeControler.articleDetails_get)


module.exports = router
