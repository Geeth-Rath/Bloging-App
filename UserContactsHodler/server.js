const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connectDb } = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //  JSON request bodies are parsed correctly.
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  // console.log("Environment Variables :", process.env);

  console.log(`Server Portsssssssssssss ${port}`);
});
