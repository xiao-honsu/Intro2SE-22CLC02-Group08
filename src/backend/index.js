const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoute"); 

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5174", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Parse JSON request body


app.use("/auth", authRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
