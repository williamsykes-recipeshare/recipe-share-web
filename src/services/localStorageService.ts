import { DBSchema, IDBPDatabase, openDB } from 'idb';

const SESSION_NAME = 'web-session';
const SESSION_KEY = 'web-token';

interface IDBIndex extends DBSchema {
    [SESSION_NAME] : {
        key : string;
        value : IToken;
    };
}

interface IToken {
    guid : string;
    value : string;
}

export default class LocalStorageService {
    public static async getLocalStorageSession() : Promise<IToken | null> {
        let token : IToken | undefined | null;
        if ('indexedDB' in self) {
            token = await this.getSessionIndexedDB();
        } else if ('localStorage' in self) {
            token = this.getSessionLocalStorage();
        }

        if (token) {
            return token;
        } else {
            return null;
        }
    }

    public static async setLocalStorageSession(userToken : IToken | null) : Promise<void> {
        if ('indexedDB' in self) {
            await this.setSessionIndexedDB(userToken);
        } else if ('localStorage' in self) {
            this.setSessionLocalStorage(userToken);
        }
    }

    private static setSessionLocalStorage(userToken : IToken | null) : void {
        if (userToken) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(userToken));
        } else {
            localStorage.removeItem(SESSION_KEY);
        }
    }

    private static getSessionLocalStorage() : IToken | null {
        const session = localStorage.getItem(SESSION_KEY);

        if (session) {
            return JSON.parse(session);
        } else {
            return null;
        }
    }

    /**
     * Creates all object stores up to the current DB version. i.e. for version 2, this function will execute for versions
     * 0, 1 and 2.
     * @param db
     */
    private static upgradeDb(db : IDBPDatabase<IDBIndex>, oldVersion : number) : void {
        switch (oldVersion) {
            case 0:
                if (!db.objectStoreNames.contains(SESSION_NAME)) {
                    db.createObjectStore(SESSION_NAME, {
                        keyPath: 'guid',
                    });
                }
        }
    }

    private static openDb() : Promise<IDBPDatabase<IDBIndex>> {
        return openDB<IDBIndex>(INDEXEDDBNAME, Number(INDEXEDDBVERSION), {
            upgrade: this.upgradeDb,
        });
    }

    /**
     * Sets the auth session. If no session is specified, deletes the existing entry.
     * @param userToken The session.
     */
    private static async setSessionIndexedDB(userToken : IToken | null) : Promise<void> {
        const db = await this.openDb();

        const tx = db.transaction(SESSION_NAME, 'readwrite');

        const store = tx.objectStore(SESSION_NAME);

        if (!userToken) {
            await store.clear();
        } else {
            await store.clear();
            await store.add(userToken);
        }

        await tx.done;
    }

    /**
     * Opens the DB and retrieves the current auth session.
     */
    private static async getSessionIndexedDB() : Promise<IToken> {
        const db = await this.openDb();

        const tx = db.transaction(SESSION_NAME, 'readonly');

        const result = await tx.objectStore(SESSION_NAME).getAll();

        await tx.done;

        return result[0] ?? null;
    }
}