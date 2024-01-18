import express from 'express'
import 'dotenv/config'
import router from './src/routes/index.js'
import errorHandler from './src/middleware/errorHandler.js'

const app = express()
app.use(express.json())
app.use('/', router)
app.use(errorHandler);

const start = () => {
  app.listen(process.env.PORT || 5000, () => console.log(`started`))
}

start()
