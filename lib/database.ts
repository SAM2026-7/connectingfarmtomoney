import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { MOCK_MESSAGES, MOCK_ORDERS, MOCK_PRICES, MOCK_PRODUCE, MOCK_AGGREGATIONS, MOCK_FARMERS, MOCK_BUYERS, MOCK_AGENTS, MOCK_EXPORTERS } from "@/lib/data";
import { Message, Order, PriceData, ProduceListing, User, VisitorRecord } from "@/lib/types";

const dataDirectory = join(process.cwd(), "data");
mkdirSync(dataDirectory, { recursive: true });
const database = new DatabaseSync(join(dataDirectory, "farmtomoney.sqlite"));

database.exec(`
  CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, role TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL, state TEXT NOT NULL, lga TEXT NOT NULL, verification_level TEXT NOT NULL, rating REAL NOT NULL, joined_date TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS produce (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS prices (id INTEGER PRIMARY KEY AUTOINCREMENT, payload TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS aggregations (id INTEGER PRIMARY KEY AUTOINCREMENT, payload TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS visitors (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
`);

function count(table: string) {
  return Number(database.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get()?.count ?? 0);
}

function seed() {
  if (count("users") === 0) {
    const users = [...MOCK_FARMERS, ...MOCK_BUYERS, ...MOCK_AGENTS, ...MOCK_EXPORTERS, { id: "admin", role: "admin" as const, name: "Admin User", email: "admin@farmtomoney.ng", phone: "+234 900 000 0000", state: "Lagos", lga: "Lagos Island", verificationLevel: "trusted" as const, rating: 5, joinedDate: "2024-01-01" }];
    const statement = database.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    for (const user of users) statement.run(user.id, user.role, user.name, user.email, user.phone, user.state, user.lga, user.verificationLevel, user.rating ?? 0, user.joinedDate);
  }
  if (count("produce") === 0) insertPayloads("produce", MOCK_PRODUCE);
  if (count("orders") === 0) insertPayloads("orders", MOCK_ORDERS);
  if (count("messages") === 0) insertPayloads("messages", MOCK_MESSAGES);
  if (count("prices") === 0) insertPayloads("prices", MOCK_PRICES);
  if (count("aggregations") === 0) insertPayloads("aggregations", MOCK_AGGREGATIONS);
}

function insertPayloads(table: string, records: unknown[]) {
  const statement = database.prepare(`INSERT INTO ${table} (payload) VALUES (?)`);
  for (const record of records) statement.run(JSON.stringify(record));
}

seed();

function payloads<T>(table: string): T[] {
  return (database.prepare(`SELECT payload FROM ${table}`).all() as { payload: string }[]).map(row => JSON.parse(row.payload) as T);
}

export function getUsers() {
  return (database.prepare("SELECT id, role, name, email, phone, state, lga, verification_level AS verificationLevel, rating, joined_date AS joinedDate FROM users").all() as unknown as User[]);
}
export function getProduce() { return payloads<ProduceListing>("produce"); }
export function getOrders() { return payloads<Order>("orders"); }
export function getMessages() { return payloads<Message>("messages"); }
export function getPrices() { return payloads<PriceData>("prices"); }
export function getAggregations() { return payloads<{ agentId: string; farmerId: string; produceId: string; quantity: number; grade: string; date: string }>("aggregations"); }

export function addUser(user: User) { database.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(user.id, user.role, user.name, user.email, user.phone, user.state, user.lga, user.verificationLevel, user.rating ?? 0, user.joinedDate); }
export function addProduce(produce: ProduceListing) { database.prepare("INSERT INTO produce VALUES (?, ?)").run(produce.id, JSON.stringify(produce)); }
export function addOrder(order: Order) { database.prepare("INSERT INTO orders VALUES (?, ?)").run(order.id, JSON.stringify(order)); }
export function addMessage(message: Message) { database.prepare("INSERT INTO messages VALUES (?, ?)").run(message.id, JSON.stringify(message)); }
export function addPrice(price: PriceData) { database.prepare("INSERT INTO prices (payload) VALUES (?)").run(JSON.stringify(price)); }
export function updateOrder(order: Order) { database.prepare("UPDATE orders SET payload = ? WHERE id = ?").run(JSON.stringify(order), order.id); }
export function updateProduce(produce: ProduceListing) { database.prepare("UPDATE produce SET payload = ? WHERE id = ?").run(JSON.stringify(produce), produce.id); }

export function getVisitors() { return payloads<VisitorRecord>("visitors"); }
export function addVisitor(visitor: VisitorRecord) { database.prepare("INSERT INTO visitors VALUES (?, ?)").run(visitor.id, JSON.stringify(visitor)); }
