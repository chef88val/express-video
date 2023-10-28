// require the installed packages 
import express from 'express';

import { ConfigService } from './providers/config.js';
import { RedisService } from './providers/redis.js';
import { MongoDBService } from './providers/mongo.js';
import { logger } from './middlewares/logger.js';
import { auth, file } from "./routes/index.js"; 
export const app = express();
export const configApp = new ConfigService()
const { PORT: port, HOST: host } = configApp.config
// ROUTES 


async function init() {
    const redisInstance = await (new RedisService().run());
    const mongoInstance = await (new MongoDBService().run());

    if (!redisInstance) throw new Error('Redis not ready')
    if (!mongoInstance) throw new Error('Mongo not ready')
    run();
}
const appListen = () =>
    console.log(`Server started on ${host}:${port}`)

function run() {
    app.use(express.json());
    app.use(logger);
    app.use('/auth', auth)
    app.use('/file', file)
    app.get('/health', logger, (req, res) => {
        res.send().status(200)
    })
    app.listen(port, appListen);
}
init();

