
import db from "../server/database.js";

try {
    const resultado = await db.execute(
        "SELECT 1 AS conexao"
    );

    console.log("Conexão com o Turso realizada com sucesso!");
    console.log("Resultado:", resultado.rows[0]);

} catch (erro) {
    console.error("Erro ao conectar com o Turso:");
    console.error(erro.message);
}
