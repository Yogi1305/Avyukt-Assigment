import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/data', (req, res) => {
    console.log('Received request for /api/data');
  res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );