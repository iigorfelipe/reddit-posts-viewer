import express from 'express';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
