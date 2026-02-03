import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

// Caminho para o arquivo de usuários
const filePath = path.join(process.cwd(), "modules", "users.json");

// FUNÇÃO PARA CARREGAR USUÁRIOS (Corrigida)
function loadUsers() {
    try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        if (!fs.existsSync(filePath) || fs.readFileSync(filePath, "utf8").trim() === "") {
            fs.writeFileSync(filePath, JSON.stringify([]));
            return [];
        }

        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        return [];
    }
}

// FUNÇÃO DE REGISTRO
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const users = loadUsers();

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword };
        
        users.push(newUser);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// FUNÇÃO DE LOGIN (Preenchida corretamente)
export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const users = loadUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
