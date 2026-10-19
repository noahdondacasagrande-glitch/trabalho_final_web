
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const app = express();

app.use(cors({
    origin: true
}));

app.use(express.json());

const formatosPermitidos = [".stl", ".obj", ".3mf"];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, callback) => {
        const extensao = path.extname(
            file.originalname
        ).toLowerCase();

        if (!formatosPermitidos.includes(extensao)) {
            return callback(
                new Error("Envie um arquivo STL, OBJ ou 3MF.")
            );
        }

        callback(null, true);
    }
});

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API de impressão 3D funcionando!"
    });
});

app.get("/api", (req, res) => {
    res.status(200).json({
        mensagem: "API disponível na Vercel!"
    });
});

app.post("/api/modelos", (req, res) => {
    upload.single("modelo")(req, res, (erro) => {
        if (erro) {
            const limiteExcedido =
                erro instanceof multer.MulterError &&
                erro.code === "LIMIT_FILE_SIZE";

            const muitosArquivos =
                erro instanceof multer.MulterError &&
                erro.code === "LIMIT_FILE_COUNT";

            return res.status(400).json({
                erro: limiteExcedido
                    ? "O arquivo deve ter no máximo 4 MB."
                    : muitosArquivos
                        ? "Envie apenas um arquivo por vez."
                        : erro.message || "Não foi possível receber o arquivo."
            });
        }

        if (!req.file) {
            return res.status(400).json({
                erro: "Selecione um arquivo 3D."
            });
        }

        return res.status(200).json({
            mensagem: "Arquivo recebido com sucesso!",
            nomeOriginal: req.file.originalname,
            tamanhoBytes: req.file.size,
            idArquivo: crypto.randomUUID()
        });
    });
});

// Resposta JSON para rotas não encontradas.
app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada na API.",
        caminho: req.originalUrl
    });
});

// Tratamento final de erros inesperados.
app.use((erro, req, res, next) => {
    if (res.headersSent) {
        return next(erro);
    }

    console.error("Erro na API:", erro);

    return res.status(500).json({
        erro: "Erro interno na API."
    });
});

export default app;
