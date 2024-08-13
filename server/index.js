const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3030;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173/',
	credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my-favorites')
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('disconnected', () => console.log('MongoDB Disconnected'));
mongoose.connection.on('error', err => console.log('MongoDB Error:', err));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server started on port ${port}`));