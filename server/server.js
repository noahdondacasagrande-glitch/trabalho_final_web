
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pastaUploads = path.join(__dirname, "uploads");

if (!fs.existsSync(pastaUploads)) {
    fs.mkdirSync(pastaUploads, { recursive: true });
}

const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, pastaUploads);
    },

    filename: (req, file, callback) => {
        const extensao = path.extname(file.originalname).toLowerCase();
        callback(null, `${Date.now()}${extensao}`);
    }
});

const upload = multer({
    storage: armazenamento,
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        const formatosPermitidos = [".stl", ".obj", ".3mf"];
        const extensao = path.extname(file.originalname).toLowerCase();

        if (formatosPermitidos.includes(extensao)) {
            callback(null, true);
        } else {
            callback(new Error("Formato inválido. Envie STL, OBJ ou 3MF."));
        }
    }
});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de orçamento 3D funcionando!"
    });
});

app.post("/api/modelos", (req, res) => {
    upload.single("modelo")(req, res, (erro) => {
        if (erro) {
            return res.status(400).json({
                erro: erro.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                erro: "Nenhum arquivo foi enviado."
            });
        }

        res.json({
            mensagem: "Arquivo recebido com sucesso!",
            arquivo: req.file.originalname,
            tamanho: req.file.size,
            caminho: req.file.filename
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
