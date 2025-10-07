import { Client } from "pg";
const client = new Client(process.env.DB_URL);
client.connect();

export default client;