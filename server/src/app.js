import express  from "express";
import contactRoutes from "./routes/contact.routes.js";
import workRoutes from "./routes/works.routes.js";
import philosofiesRoutes from "./routes/philosofies.routes.js";
import languagesRoutes from "./routes/languages.routes.js";
import codeBlocksRoutes from "./routes/codeblocks.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use(express.json());
app.use(contactRoutes);
app.use(workRoutes);
app.use(philosofiesRoutes);
app.use(languagesRoutes);
app.use(codeBlocksRoutes);


export default app;