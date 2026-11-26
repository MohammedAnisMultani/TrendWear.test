





-----------------------------
deploying backend to vercel 

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // stop the app if DB fails
  }
}

connectDB();


------------------
  //claude suggestion
    app.set('trust proxy', 1)   // 👈 add this line
    // ---------