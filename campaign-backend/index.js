require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const campaignRoutes = require('./routes/campaign');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/campaigns', campaignRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
