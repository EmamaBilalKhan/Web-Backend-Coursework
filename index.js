const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Config/db');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use(session({
    secret: 'your-secret-key',
    resave: false,             
    saveUninitialized: false,  
    cookie: { secure: false } 
}));

app.get("/",(req, res) => {
    res.status(200).json({ message: 'Welcome' });
});
const userRoute = require('./Routes/Users');
app.use('/Users', userRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

