const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoute"); 
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute")

dotenv.config();
const app = express();
app.use('/mockData', express.static(path.join(__dirname, 'mockData')));
// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.options('*', cors());
app.use(express.json()); // Parse JSON request body


app.use("/auth", authRoutes); 
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
