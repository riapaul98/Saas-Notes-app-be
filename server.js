//entry point - to run the server and DB connection

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;


// Connect to database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
