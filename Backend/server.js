// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;

app.use(express.json());
app.use(cors(
     {
    origin : ["https://mern-login-signup-using-clusterdb-frontend.vercel.app/signup"],
    methods : ["POST", "GET"],
    credentials : true
  }
));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
