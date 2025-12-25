//entry point - to run the server and DB connection

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

//Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Start the server 
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
