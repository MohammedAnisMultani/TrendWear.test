Test API Key:  rzp_test_St7Uw9fUDXR1WQ

Test Key Secret:  304VcLBq4I6xHT0gtoN8UkHI

RAZORPAY_KEY_ID=rzp_test_St7Uw9fUDXR1WQ
RAZORPAY_KEY_SECRET=304VcLBq4I6xHT0gtoN8UkHI

razorpay test card detials
card number 
4100 2800 0000 1007 (visa)
cvv : random 3-digit

password for nodemailer generated from(app password - Gmail): scff bvhd sspd pano





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