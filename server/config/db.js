import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri =
    process.env.MONGO_URI ||
    "mongodb+srv://ashishsingh0828_db_user:aj88XpPJzbIddp3m@cluster0.jfbjbp9.mongodb.net/rajivDB?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    return conn.connection;
  } catch (error) {
    console.error("[MongoDB] Connection error:", error.message);
    throw error;
  }
};
