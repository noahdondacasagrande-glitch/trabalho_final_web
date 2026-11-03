
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { default: db } = await import("../server/database.js");

try {
    const resultado = await db.execute("SELECT 1 AS conexao");

    if (resultado.rows.length > 0) {
        console.log("Conexão com o Turso realizada com sucesso!");
        console.log("Resultado:", resultado.rows[0]);
    }
} catch (erro) {
    console.error("Erro ao conectar com o Turso:", erro.message);
} finally {
    db.close();
}
