import {SQLiteDatabase} from "expo-sqlite";
import {Account} from "@/lib/store/features/accounts/accountsSlice";

export function getAllAccounts(db: SQLiteDatabase) {
    return db.getAllSync(`SELECT *
                          FROM accounts`);
}

export function getAllCategories(db: SQLiteDatabase) {
    return db.getAllSync(`SELECT *
                          FROM categories`);
}

export async function createAccount(db: SQLiteDatabase, account: {
    title: string,
    icon: string,
    balance: number,
    positiveState: boolean
}): Promise<any> {
    const accounts = await db.getAllAsync('SELECT * FROM accounts WHERE title = ?', [account.title]);
    if (accounts.length > 0) {
        return {
            error: true,
            desc: 'Ya existe una cuenta con ese nombre.',
        };
    } else {
        const statement = await db.prepareAsync('INSERT INTO accounts (title, icon, balance, positive_state) VALUES ($title, $icon, $balance, $positive_state)');
        await statement.executeAsync({
            $title: account.title,
            $icon: account.icon,
            $balance: account.balance,
            $positive_state: account.positiveState
        });
        const accountCreated = await db.getAllAsync('SELECT * FROM accounts ORDER BY id DESC LIMIT 1');
        return {
            error: false,
            desc: '',
            data: accountCreated[0]
        }
    }
};
