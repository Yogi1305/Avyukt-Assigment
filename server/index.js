import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/database.js';
import UserRoute from './routes/auth.route.js';
import TodoRoute from './routes/todo.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get('/healthCheck', (req, res) => {
//   try {
//     console.log('Health check endpoint hit');
//   res.json({ message: 'Hello from the server!' });
    
//   } catch (error) {
//      console.error('Error in health check:', error);
//      res.status(500).json({ message: 'Server error' });
//   }
// });

connectDB().then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

app.use("/user",UserRoute)
app.use("/todo",TodoRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );