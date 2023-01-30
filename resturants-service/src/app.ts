import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { connect } from './services/db';

async function startServer() {
    try {
        await connect();
        const app = express();

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        app.use(bodyParser.json());
        app.use('/api', routes);

        app.listen(3000, () => {
            console.log('Server started on port 3000!');
        });
    } catch (error) {
        console.log('TypeORM connection error: ', error);
    }
}

startServer();

