import app from "./app.js";
import { connectDB } from "./database/db.js";
import dotenv from 'dotenv';
dotenv.config();
connectDB();
app.listen(3000);
console.log("server conectado en el puerto", 3000)

