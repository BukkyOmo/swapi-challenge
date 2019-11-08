/* istanbul ignore file */
import redis from 'redis';
import{ promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();
const { REDIS_URL_DEV } = process.env;

export default new class CacheStorage {
    constructor(){
        if(CacheStorage.exists){
            return CacheStorage.instance;
        }
        this.client = redis.createClient(REDIS_URL_DEV);
        this.client.getAsync = promisify(this.client.get)
        this.client.setAsync = promisify(this.client.set)        
        this.client.setexAsync = promisify(this.client.setex)
        this.client.delAsync = promisify(this.client.del)
        this.client.flushallAsync = promisify(this.client.flushall)

        CacheStorage.instance = this;
        CacheStorage.exists = this;
    }

    async save(key, value) {
        const currentState = await this.fetch(key);

        if(!currentState){
            return this.saveObject(key, value)
        }
        return this.client.setAsync(key, JSON.stringify(currentState));
    }

     async fetch(key) {
     const result = await this.client.getAsync(key);
     return result ? JSON.parse(result): result
    }

    saveObject(key, value){
        const minutes = 5;
        const maxCacheAge = 1000 * 60 * minutes;
        return this.client.setexAsync(key, maxCacheAge, JSON.stringify(value));
    }

    async delete(key){
        return this.client.delAsync(key);
    }
 
    async flush(){
        return this.client.flushallAsync();
    }

}