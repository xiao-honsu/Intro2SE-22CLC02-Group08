const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoute"); 
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");

dotenv.config();
const app = express();
app.use('/mockData', express.static(path.join(__dirname, 'mockData')));
// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.options('*', cors());
app.use(express.json()); 


app.use("/auth", authRoutes); 
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
