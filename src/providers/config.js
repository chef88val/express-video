import { number, z } from "zod";
// const z = require("zod");
import { env } from 'node:process';
export class ConfigService {
    schema 
    configSchema
    constructor(){
        this.schema = z.object({
            PORT: z.number().optional().default(3000),
            HOST: z.string().optional().default('http://localhost'),
            ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
        REDIS_PASSWORD: z.string().optional().default(''),
        REDIS_PORT: z.number().optional().default(15619),
        REDIS_HOST: z.string().optional().default(''),
        MONGO_URI: z.string().optional().default(''),
        },{errorMap:(issue, _ctx)=>{
            console.log(issue, _ctx)
        }});
        const safeParse = {...env, PORT: parseInt(env.PORT), REDIS_PORT: parseInt(env.REDIS_PORT)}
        this.configSchema = this.schema.safeParse(safeParse)
        // this.configSchema.data.port = parseInt(this.configSchema.data.port)
        // this.configSchema.data.redis_port = parseInt(this.configSchema.data.redis_port)

    }
    get config(){
        return this.configSchema.data
    }

    


}