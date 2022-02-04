import { MongoClient } from "mongodb";

//api/new-meetup

//POST/aip/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //const {title,image,address, description}=data;

    // const { MongoClient } = require('mongodb');
    // const uri ="mongodb+srv://mrsurajpokhrel:Greenland7D@cluster0.hxsvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // client.connect(err => {
    //   const meetupsCollection = client.db("test").collection("devices");
    //   // perform actions on the meetupsCollection object
    //     const result =meetupsCollection.insertOne(data);
    //     console.log(result);

    //   client.close();
    //   res.status(201).json({message:"meetup inserted!!"});
    // });
    const client = await MongoClient.connect(
      "mongodb+srv://mrsurajpokhrel:Greenland7D@cluster0.hxsvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted!!" });
  }
}

export default handler;
