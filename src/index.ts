import express from "express";
import cors from "cors";
import { config } from "dotenv";
// import { PostgreSQLConnection } from "./db/connectDB";
import { routes } from "./routes";

config();

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.static("public"));
app.use(routes);

async function initializeServer() {
	try {
		// const db = new PostgreSQLConnection();
		// await db.conn();

		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.error("Erro ao inicializar o servidor:", error);
	}
}

initializeServer();
