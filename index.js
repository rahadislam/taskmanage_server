const express = require('express');
const app=express();
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
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
        const taskCollecton = client.db('taskmanage').collection('addtask');
        const completeCollecton = client.db('taskmanage').collection('completeTask');

        app.get('/task', async (req, res) => {

            const query = {};
            const carsor = taskCollecton.find(query);
            const task = await carsor.toArray();
            res.send(task);
        })
        app.get('/complete', async (req, res) => {

            const query = {};
            const carsor = completeCollecton.find(query);
            const task = await carsor.toArray();
            res.send(task);
        })
        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollecton.insertOne(newTask);

            res.send(result);
        });
        app.post('/complete', async (req, res) => {
            const newTask = req.body;
            const result = await completeCollecton.insertOne(newTask);
            res.send(result);
        });
        app.get('/task/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const task=await taskCollecton.findOne(query);
            res.send(task);
        })

        app.delete('/task/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const task=await taskCollecton.deleteOne(query);
            res.send(task);
        })

        app.put('/task/:id',async(req,res)=>{
            const id=req.params.id;
            const taskUpdates=req.body;
            const filter={_id:ObjectId(id)};
            const options={upsert:true};
            const updateing={
                $set:{
                    name:taskUpdates.name,
                    description:taskUpdates.description
                }
            }
            const task=await taskCollecton.updateOne(filter,updateing,options);
            res.send(task);
        })

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