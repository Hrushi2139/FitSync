import express from 'express';
import {mongoDB} from './utils/mongo.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT||3000;

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
    mongoDB();
    console.log(`Server running at http://localhost:${PORT}`);
  })





// mongoose.connect('mongodb://localhost:27017/fitSync', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })




