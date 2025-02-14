import { createClient } from 'redis'
import { REDIS_HOST, REDIS_PORT } from './secrets'

const redisClient= createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})


redisClient.on('error', err => console.error(err));


// Initialize connection
(async function() {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
        }
        
        // Test connection
        console.log('Successfully connected to Redis')
    } catch (error) {
        console.error('Failed to connect to Redis:', error)
        throw error
    }
})()


export { redisClient }
