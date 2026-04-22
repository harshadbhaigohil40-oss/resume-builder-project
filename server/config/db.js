const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB Connected Successfully");
    })
    .catch((err) => {
      console.log("❌ MongoDB Connection Error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
