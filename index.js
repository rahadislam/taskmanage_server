const express = require('express');
const app=express();
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
app.use(cors());
app.use(express.json());
//environment variable use command
require('dotenv').config()

const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.4ovwe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        console.log('db connect');

    }
    finally{

    }

}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('welcome taskmanage app server!!!!');
})
app.listen(port,()=>{
    console.log('task server is running');
})