import { Pool } from "pg";
import { config } from "dotenv";

config();

export class PostgreSQLConnection {
	private pool: Pool;

	constructor() {
		// Configurar a conexão com o banco de dados PostgreSQL
		this.pool = new Pool({
			connectionString: process.env.DATABASE_URL,
		});
	}

	async conn() {
		try {
			// Tentar conectar ao banco de dados
			await this.pool.connect();
			console.log("Conectado ao banco de dados PostgreSQL");
		} catch (error) {
			console.error(
				"Erro ao conectar ao banco de dados PostgreSQL:",
				error
			);
			throw error;
		}
	}
}
