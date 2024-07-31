import {SQLiteDatabase} from "expo-sqlite";

export async function getAllAccounts(db: SQLiteDatabase) {
    return await db.runAsync(`SELECT * FROM accounts`);
}
