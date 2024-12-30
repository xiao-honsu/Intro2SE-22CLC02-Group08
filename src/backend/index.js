const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoute"); 
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const reportRoutes = require("./routes/reportRoute");
const notificationRoutes = require("./routes/notificationRoute");
const messageRoutes = require("./routes/messageRoute");
const accessHistoryRoutes = require("./routes/accessHistoryRoute");
const StatisticsRoutes = require("./routes/statisticsRoute");
const supportRoutes = require("./routes/supportRoute");
const adminNotificationRoutes = require("./routes/adminNotificationRoute");
const supportChatRoutes = require("./routes/supportChatRoute");

const app = express();
app.use('/mockData', express.static(path.join(__dirname, 'mockData')));
// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.options('*', cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes); 
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/report", reportRoutes);
app.use("/notification", notificationRoutes);
app.use("/message", messageRoutes);
app.use("/access_history", accessHistoryRoutes);
app.use("/statistics", StatisticsRoutes);
app.use("/support", supportRoutes);
app.use("/admin-notification", adminNotificationRoutes);
app.use("/support-chat", supportChatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
