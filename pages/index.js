// import { useState, useEffect } from 'react';
import { MongoClient } from "mongodb";
import Head  from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];
function HomePage(props) {

  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(()=>{
  // setLoadedMeetups(DUMMY_DATA);
  //   },[])
  return ( 
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Find you important meetups and todo lists."/>
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>
  );
}
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return{
//     props:{
//       meetups:DUMMY_DATA
//     }
//   }
// }
export async function getStaticProps() {
  //console.log("getStaticProps");
  //return data from API
  const client = await MongoClient.connect(
    "mongodb+srv://mrsurajpokhrel:Greenland7D@cluster0.hxsvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupsFromMongoDB = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetupsFromMongoDB.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        description: meetups.description,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
