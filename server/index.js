const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { config } = require('dotenv');

const userRoute = require('./routes/userRoutes.js');
const masterSIRoute = require('./routes/masterSIRoutes.js');
const masterServerRoute = require('./routes/masterServerRoutes.js');
const masterSkalaRoute = require('./routes/masterSkalaRoutes.js');
const reportRoute = require('./routes/reportRoutes.js');

config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});
app.use(userRoute);
app.use(masterSIRoute);
app.use(masterServerRoute);
app.use(masterSkalaRoute);
app.use(reportRoute);

app.listen(port, () => {
  console.log('Server berjalan di port ' + port);
});