const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Backend!");
});

app.use("/products", productRoutes);

module.exports = app;