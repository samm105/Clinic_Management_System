const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv"); // Import dotenv to manage environment variables
const patientRoutes = require('./routes/Patient-Record-Routes');
const prescriptionRoutes = require('./routes/prescriptions-routes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://samarthsaxena2002:Samarth@cluster-cm.nurro.mongodb.net/"

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

  app.use('/api/patients', patientRoutes);
  app.use('/api/prescriptions', prescriptionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
