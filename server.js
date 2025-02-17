const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const validateToken = require("./middleware/validateTokenHandler");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running from the port ${port}`);
});
