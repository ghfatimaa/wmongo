
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import fs from 'fs'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'

const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
};

(async () => {

    const client = new MongoClient(process.env.MONGOURL);

    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
        const db = client.db(process.env.MONGODB_DB);
        
        let test = await db.collection("test")
        let ali = await test.findOne({fname:"ali",lname:"akbari"})
        ali.age=28
        ali.faves=[
            {
                type:"sport",
                name:"chess"
            },
            {
                type:"study",
                name:"chemistry"
            }
        ]
        let result = await test.deleteOne({fname:"ali",lname:"akbari"})
        await test.insertOne(ali)
        console.log(result)
       
    
        

    }catch {
        console.log("Failed to connect to Mongo Server.")
    }
    process.exit()
})()



