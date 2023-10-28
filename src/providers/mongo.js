
import { MongoClient, ServerApiVersion } from 'mongodb';
import { configApp } from "../server.js";

 export class MongoDBService {
    client;
    constructor() {
        this.client = new MongoClient( configApp.config.MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    async run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            return this.client;
        }
    }
}