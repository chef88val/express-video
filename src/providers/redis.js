// const   {createClient} = require('redis');
import { createClient } from 'redis';
import { config } from 'dotenv';
import { configApp } from "../server.js";
config();

export class RedisService {
    client
    constructor() {
        this.client = new createClient({
            password: configApp.config.REDIS_PASSWORD,
            socket: {
                host: configApp.config.REDIS_HOST,
                port: configApp.config.REDIS_PORT
            }
        })
    }
    async run() {
        try {

            this.client.on('connect', success =>
                console.log("You successfully connected to Redis!")
            )

                .on('error', err => console.log('Redis Client Error', err))
                .connect();;
        } catch (error) {
            throw new Error(error)
        }


        // const client = await createClient({url:'redis://redis-15619.c1.asia-northeast1-1.gce.cloud.redislabs.com:15619'}) .on('error', err => console.log('Redis Client Error', err))
        // .connect();;
        // await client.set('key', 'value');
        // const value = await client.get('key');
        return this.client

    }
}