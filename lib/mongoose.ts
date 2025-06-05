import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // prevent unknown field queries

    if(!process.env.MONGODB_URI) return console.log("MONGODB_URI is not defined");

    if(isConnected) return console.log("Already connected to MongoDB");

    try{
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Error connecting to MongoDB", error);
    }
}
 