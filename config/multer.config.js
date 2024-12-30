const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         const uniquePrefix = Date.now()
//         cb(null, `${uniquePrefix}-${file.originalname}`)
//     }
// })

const storage = multer.memoryStorage()

const upload = multer({
    storage
})

module.exports = upload