const express = require('express')
const { cloudinary } = require('./utils/cloudinary')
const app = express();
const port = process.env.PORT || 3001
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search.expression('').sort_by('public_id', 'desc').max_results(30).execute()
    const publicIds = resources.map(file => file.url)
    console.log(resources)
    res.send(publicIds)
})
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data
        // console.log(fileStr)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'my_images'
        })
        console.log(uploadedResponse)
        res.json({ url: uploadedResponse.url })

    } catch (e) {
        console.error(e)
        res.status(500).json({ err: 'loi' })
    }
})
app.listen(port, () => {
    console.log(`listen on port ${port}`)
})