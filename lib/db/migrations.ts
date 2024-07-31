import {SQLiteDatabase} from "expo-sqlite";


export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    // Log DB path for debugging
    // console.log(FileSystem.documentDirectory);

    // Clear table
    // await db.runAsync('DELETE FROM migrations')

    // DROP table
    // await db.runAsync('DROP TABLE migrations')

    // Check if migrations table exists
    await db.execAsync(`
                PRAGMA journal_mode = 'wal';

                CREATE TABLE IF NOT EXISTS migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    version INTEGER NOT NULL,
                    name TEXT NOT NULL,
                    applied_at TEXT NOT NULL
                )
            `)

    // Get the latest applied migration version
    const result: any = await db.getFirstAsync(`SELECT MAX(version) as max_version FROM migrations`)
    let latestAppliedMigration = result.max_version ?? 0


    // Get the latest applied migration version
    for (const migration of migrations) {
        if (migration.version > latestAppliedMigration) {
            await migration.migrate(db);
            const statement = await db.prepareAsync(
                `INSERT INTO migrations (version, name, applied_at) VALUES ($version, $name, $applied_at)`
            )
            await statement.executeAsync({ $version: migration.version, $name: migration.name, $applied_at: new Date().toISOString() });
            latestAppliedMigration = migration.version;
        }
    }

    const allMigrations = await db.getAllAsync('SELECT * FROM migrations')
    console.log(allMigrations)
}

const migrations = [
    {
        version: 1,
        name: 'initial migration',
        migrate: async (db: SQLiteDatabase) => {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    icon TEXT NOT NULL,
                    balance INTEGER NOT NULL,
                    positive_state BOOLEAN DEFAULT TRUE
                )
            `);

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    icon TEXT NOT NULL,
                    type TEXT NOT NULL
                )
            `)

            await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    isRecurrent BOOLEAN DEFAULT FALSE,
                    amount INTEGER NOT NULL,
                    category_id INTEGER NOT NULL,
                    FOREIGN KEY (category_id) REFERENCES categories(id)
                )
            `)
        }
    },
];
