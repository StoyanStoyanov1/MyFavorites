const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./router');  // Импортиране на рутера

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'https://myfavorites.onrender.com',
	credentials: true
}));
app.use(express.json());
app.use('/api',userRouter);

const dbURI = "mongodb+srv://myfavorites:NY7MbFerrvTOsBUV@myfavorites.mrbrd.mongodb.net/?retryWrites=true&w=majority&appName=MyFavorites";
mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('disconnected', () => console.log('MongoDB Disconnected'));
mongoose.connection.on('error', err => console.log('MongoDB Error:', err));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server started on port ${port}`));
