const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config.json')
const cors = require('cors')
const courseRouter = require('./api/course/router')
const userRouter = require('./api/user/router')

//connection with mongoDB
mongoose.connect(config.mongodb.mongoURL, config.mongodb.mongoOptions)
.then(() => {
    console.log("Database connection successful")
})
.catch((err) => {
    console.log(err)
})

//express app initialization
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// app.use(cors({
//     origin:'http://localhost:3000/',
// }))

app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/users', userRouter)
app.use('/course', courseRouter)


app.listen(config.mongodb.port, () => {
    console.log(`Server is running on port ${config.mongodb.port}`)
})