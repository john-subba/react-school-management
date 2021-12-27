const express = require('express');
const connectDB = require('./config/db');

// call express
const app = express();

// call mongodb
connectDB();

// very imp step
// init middleware for body parser
app.use(express.json({ extended: false }));

// call routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/class', require('./routes/api/class'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at PORT: ${PORT}`));
