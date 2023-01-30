import { Client } from 'pg';

const client = new Client({
    connectionString: 'postgres://tcnqdocx:emo367LMybZni_Tu5a8c9vs1bo5CM_sH@trumpet.db.elephantsql.com:5432/tcnqdocx',//move to config
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
