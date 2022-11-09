const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {

    res.send('website server is running')

})



console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9pyp5ct.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const servicesCollection = client.db('photographer').collection('services')

        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

    }
    finally {

    }

}
run().catch(error => console.error(error))





app.listen(port, () => {
    console.log(`server is online on ${port}`)
})