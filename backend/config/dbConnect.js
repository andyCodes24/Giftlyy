const mongoose = require("mongoose");


  const connectDB = async () => {
   const connectionString = process.env.MONGODB_CONNECTION_STRING;

   if (!connectionString) {
     console.error("MONGODB_CONNECTION_STRING is not created, please set it in your .env file.");
     process.exit(1); // To stop the process if the connection fails
   }
try {
    const connect = await mongoose.connect(connectionString);
 
  console.log(`MongoDB connected: ${connect.connection.host} , ${connect.connection.name}`);
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); 
}
};
 
// TO catch connection errors 
mongoose.connection.on("error",(error)=>{
    console.error("MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected",()=>{
    console.warn("MongoDB disconnected");
});

module.exports = connectDB;