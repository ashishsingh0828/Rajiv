import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  const primaryUri =
    process.env.MONGO_URI ||
    "mongodb+srv://ashishsingh0828_db_user:DvYQKjYinWrOuTSE@cluster0.a2kqnhf.mongodb.net/rajivDB?retryWrites=true&w=majority&appName=Cluster0";

  const fallbackUri =
    "mongodb+srv://ashishsingh0828_db_user:aj88XpPJzbIddp3m@cluster0.jfbjbp9.mongodb.net/rajivDB?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 4000,
      socketTimeoutMS: 45000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    return conn.connection;
  } catch (primaryErr) {
    console.warn("[MongoDB] Primary cluster unreachable, connecting to persistent Atlas cluster...", primaryErr.message);
    try {
      const conn = await mongoose.connect(fallbackUri, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
      });
      isConnected = conn.connections[0].readyState === 1;
      console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
      return conn.connection;
    } catch (fallbackErr) {
      console.error("[MongoDB] Connection error:", fallbackErr.message);
      throw fallbackErr;
    }
  }
};
