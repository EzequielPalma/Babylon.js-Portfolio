import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Otros parámetros de configuración de conexión si es necesario
          });
        console.log("Conectado a MongoDB!");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}
