import mongoose from "mongoose";

async function connectiontoDB() {
    const connection = await mongoose.connect(process.env.MONGODB_URL)

    if (connection) {
        console.log("Connected to MongoDB successfully");
    }
    else {
        console.log("Failed to connect to MongoDB");
    }
}  
export default connectiontoDB; 