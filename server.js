import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import agendaRoutes from "./routes/agendaRoutes.js";
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend estático
const publicPath = path.join(__dirname, "src", "public");
app.use(express.static(publicPath));

// TELAS (GET)
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "login.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(publicPath, "admin.html"));
});

// API
app.use("/auth", authRoutes);
app.use("/api", agendaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
