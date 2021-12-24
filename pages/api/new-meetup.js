// POST api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    // ======================
    // Working Demo by Author
    // ======================
    const data = req.body;
    // connect to DB
    const client = await MongoClient.connect(
      'mongodb+srv://hardy:hardy!!123@cluster0.lbgbb.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: 'Meetup inserted !!' });

    // =======================
    // Working Demo by MongoDB NOT WORKING
    // =======================
    // const uri = "mongodb+srv://hardy:hardy!!123@cluster0.lbgbb.mongodb.net/meetups?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // client.connect(async err => {
    //   const collection = client.db().collection("meetups");
    //   console.log(collection);
    //   // perform actions on the collection object
    //   const result = await collection.insertOne(data);
    //   console.log(result);
    //   res.status(201).json({ message: 'Meetup inserted !!' });
    //   client.close();
    // });

  }
}

export default handler;
