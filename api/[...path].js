
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
  res.json({
    mensagem: "API de impressão 3D funcionando!"
  });
});

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API disponível na Vercel!"
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

    return res.json({
      mensagem: "Arquivo recebido com sucesso!",
      nomeOriginal: req.file.originalname,
      tamanhoBytes: req.file.size,
      idArquivo: crypto.randomUUID()
    });
  });
});

export default app;
