import express from "express"

import notesRoutes from "./routes/notes";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users"
//middleware de express
import morgan from "morgan"
import pkg from "../package.json";
import cors from "cors";
import helmet from "helmet";


const app= express();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan(("dev")))
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({
      message: "Bienvenido a mi crud de notas",
      name: app.get("pkg").name,
      version: app.get("pkg").version,
      description: app.get("pkg").description,
      author: app.get("pkg").author,
    });
  });

// Routes
app.use("/api/notas", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);



export default app;