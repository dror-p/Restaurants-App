import { Client } from 'pg';

const client = new Client({
    connectionString: 'ask Dror',//move to config
});

export const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to postgres');
    } catch (err) {
        throw err;
    }
}

export const query = (text: string, params?: any[]) => {
    return client.query(text, params);
}

export const close = async () => {
    try {
        await client.end();
        console.log('Disconnected from postgres');
    } catch (err) {
        throw err;
    }
}
