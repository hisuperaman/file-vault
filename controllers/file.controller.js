const { decode } = require("base64-arraybuffer")
const supabase = require("../config/supabase.config")
const fileModel = require("../models/file.model")

async function home(req, res) {
    const files = await fileModel.find({ user: req.user.userId }, { originalName: 1, createdAt: 1 }).sort({createdAt: -1})
    
    return res.render('home', { files, user: req.user })
}

async function handleUpload(req, res) {
    const { originalname, mimetype, buffer } = req.file

    const uniquePrefix = Date.now()
    const uniqueFilename = `${uniquePrefix}-${originalname}`

    const fileArrayBuffer = decode(buffer.toString('base64'))

    const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET_NAME)
        .upload(`public/${uniqueFilename}`, fileArrayBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype
        })

    if (error) {
        console.log(error)
        return res.status(500).send('Error uploading file')
    }

    await fileModel.create({
        user: req.user.userId,
        originalName: originalname,
        path: data.path
    })


    return res.redirect('/')
}


async function handleDownload(req, res) {
    const fileId = req.params.fileId

    const { path, originalName } = await fileModel.findById(fileId)

    const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET_NAME)
        .createSignedUrl(path, 60)

    if(error) {
        console.log(error)
        return res.status(500).send('Error downloading file')
    }

    return res.json({
        downloadUrl: data.signedUrl,
        originalName
    })
}

module.exports = {
    home,
    handleUpload,
    handleDownload
}