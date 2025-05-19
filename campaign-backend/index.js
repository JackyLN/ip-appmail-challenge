require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const campaignRoutes = require("./src/routes/campaign");
const scrapeRoutes = require("./src/routes/scrape");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/campaigns", campaignRoutes);
app.use("/scrape", scrapeRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
