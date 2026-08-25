import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import clerkWebhooks from './controllers/webhooks.js'
import stripeWebhooks from './controllers/stripeWebhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'

import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';
// initialize express
const app = express()

// connect to database and cloudinary
await connectDB()
await connectCloudinary()

// middlewares
app.use(cors())
// app.use(express.json())
app.use(clerkMiddleware())

app.use((req, res, next) => {
  console.log('INCOMING:', req.method, req.originalUrl);
  next();
});

// Routes
app.get('/', (req, res) => res.send('API Working'))


app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)

// Stripe needs the RAW body (not parsed JSON) to verify the signature
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

app.use('/api/educator', express.json(), educatorRouter)

app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})