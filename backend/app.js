const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const fileResourcesRouter = require('./routes/file-resources.route')

appInit(app)

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}/`)
})

function appInit(app) {
    app.use(cors())
    app.use(express.json({limit: '50mb'}))
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    app.use(cookieParser())
    app.use('/public', express.static(path.resolve('public')))
    app.use('/files', fileResourcesRouter)
}