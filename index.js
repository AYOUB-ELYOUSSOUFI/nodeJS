const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const stripeRouter = require('./routes/stripe');
const cors = require('cors');

// .env CONFIGURATION
dotenv.config();

// CONNECTION TO DB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DbConnection successfull!"))
    .catch((err) => console.log(err));

// ROUTES
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

// Configure host       
app.listen(process.env.PORT || 5000, () => {
    console.log("Back end server is running");
});
