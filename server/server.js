const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors({
    origin: process.env.HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(process.env.MONGOURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/api/students', require('./routes/student'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
