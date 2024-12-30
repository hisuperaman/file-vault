const express = require('express')

const jwtVerify = require('../middlewares/auth')
const { home, handleUpload, handleDownload } = require('../controllers/file.controller')
const upload = require('../config/multer.config')

const router = express.Router()

router.get('/', jwtVerify, home)


router.post('/upload', jwtVerify, upload.single('file'), handleUpload)
router.get('/download/:fileId', jwtVerify, handleDownload)

module.exports = router