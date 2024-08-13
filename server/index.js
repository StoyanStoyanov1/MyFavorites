const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3030;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('disconnected', () => console.log('MongoDB Disconnected'));
mongoose.connection.on('error', err => console.log('MongoDB Error:', err));

app.listen(port, () => console.log(`Server started on port ${port}`));