import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3001;

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

const pastaUploads = path.join(__dirname, "uploads");

fs.mkdirSync(pastaUploads, { recursive: true });

const formatosPermitidos = [".stl", ".obj", ".3mf"];

const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, pastaUploads);
    },
    filename: (req, file, callback) => {
        const extensao = path.extname(file.originalname).toLowerCase();
        callback(null, `${crypto.randomUUID()}${extensao}`);
    }
});

const upload = multer({
    storage: armazenamento,
    limits: {
        fileSize: 50 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, callback) => {
        const extensao = path.extname(file.originalname).toLowerCase();

        if (!formatosPermitidos.includes(extensao)) {
            return callback(
                new Error("Formato não permitido. Envie STL, OBJ ou 3MF.")
            );
        }

        callback(null, true);
    }
});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de impressão 3D funcionando!"
    });
});

app.get("/api", (req, res) => {
    res.json({
        mensagem: "API disponível localmente!"
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
                erro: "Selecione um arquivo 3D."
            });
        }

        res.json({
            mensagem: "Arquivo recebido com sucesso!",
            nomeOriginal: req.file.originalname,
            tamanhoBytes: req.file.size,
            idArquivo: req.file.filename
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});