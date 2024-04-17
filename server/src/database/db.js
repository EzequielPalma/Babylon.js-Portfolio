import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://cabezadearbol14:WS1oEKPCoizDZZKK@mern.00idlsz.mongodb.net/?retryWrites=true&w=majority&appName=mern")
        console.log("Conectado a mongo!");

    } catch (error) {
        console.error("error:",error)
    }
}

