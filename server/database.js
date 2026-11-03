
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    throw new Error(
        "As variáveis TURSO_DATABASE_URL e TURSO_AUTH_TOKEN precisam estar configuradas."
    );
}

const db = createClient({
    url,
    authToken,
});

export default db;
