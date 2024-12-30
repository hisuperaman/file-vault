const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const dbConnect = require('./config/db.config.js')

const userRouter = require('./routes/user.routes')
const fileRouter = require('./routes/file.routes')

dotenv.config()

const app = express()

dbConnect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY))

app.use(morgan('dev'))
app.set('view engine', 'ejs')


app.use('/', fileRouter)
app.use('/user', userRouter)


app.listen(process.env.PORT, ()=>{
    console.log('Server started at PORT', process.env.PORT)
})