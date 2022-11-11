const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {

    res.send('website server is running')

})





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9pyp5ct.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const servicesCollection = client.db('photographer').collection('services');
        const ordersCollection = client.db('photographer').collection('orders');
        const reviewCollection =client.db('photographer').collection('review')
        const reviewsCollection =client.db('photographer').collection('reviews')

        app.get('/three', async(req, res) =>{
            const query = {}
            const cursor = servicesCollection.find(query)
            const ser = await cursor.limit(3).toArray();
            res.send(ser)
        })
        
        
        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/services/:id', async(req, res) =>{

            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const service = await  servicesCollection.findOne(query)
            res.send(service);

        });

        app.get('/review', async(req, res) =>{
            const query = {}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
        app.get('/review/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const review = await  reviewCollection.findOne(query)
            res.send(review);

            
        })




        //orders area

        app.get ('/orders', async(req, res) =>{

            let query ={};
            if(req.query.email){
                query ={
                    email:req.query.email
                }

            }
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);

        })

        app.post('/orders', async(req, res) =>{
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        })

  ///          // reviews



        app.get ('/reviews', async(req, res) =>{
            console.log(req.query);

            let query ={};
            if(req.query.email){
                query ={
                    myEmail : req.query.email
                }

            }
            const cursor =reviewsCollection.find(query);
            const myReviews = await cursor.toArray();
            res.send(myReviews);

        });

        app.post('/reviews', async(req, res) =>{
            const myReview = req.body;
            const result = await reviewsCollection.insertOne(myReview);
            res.send(result);
        })

    }
    finally {

    }

}
run().catch(error => console.error(error))





app.listen(port, () => {
    console.log(`server is online on ${port}`)
})