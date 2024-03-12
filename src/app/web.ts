import express from 'express'

import cors from 'cors'
import { publicRouter } from '../routes/public-routes'
import { errorHandlerMiddleware } from '../middlewares/error-handler'
import { protectedRoute } from '../routes/private-routes'

// Init express
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bank Sampah API'
  })
})

//* Routes
app.use('/api/v1', publicRouter)
app.use('/api/v1', protectedRoute)

//* Error handler
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
