require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRoute = require("./routes/index");
const inventoryRoutes = require("./routes/inventory");

const app = express();

// Middleware
app.use(cors());
// Any requests that comes in, checks if it has some body (data) to the request, which if it does, it will attach that to the request object
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/", indexRoute);
app.use("/api/inventory", inventoryRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Runs server only once connected to database and on PORT number
    app.listen(process.env.PORT, () =>
      console.log(
        "Connected to database and listening on port",
        process.env.PORT
      )
    );
  })
  .catch((err) => console.log(err));
