const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DB = require('./config/keys').mongoURI;
const items = require('./routes/api/items');
const path = require('path');
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log('MnogoDB connected'))
  .catch(err => console.log(err));

//use items.js for routes
app.use('/api/items', items);

//Serve static assets if env in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port} `));
