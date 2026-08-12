import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import clerkWebhooks from './controllers/webhooks.js'
// import { clerkMiddleware } from '@clerk/express'

// initialize express
const app = express()

// connect to database and cloudinary
await connectDB()
// await connectCloudinary()

// middlewares
app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send('API Working'))
app.post('/clerk',express.json(),clerkWebhooks )

// TODO: mount real routes once built, e.g.
// app.use('/api/educator', educatorRouter)
// app.use('/api/course', courseRouter)
// app.use('/api/user', userRouter)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})