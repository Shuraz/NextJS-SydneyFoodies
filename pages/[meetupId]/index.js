import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
      <Fragment>
          <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description}/>
          </Head>
      <MeetupDetail image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
        />
        </Fragment>
  );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(
        "mongodb+srv://mrsurajpokhrel:Greenland7D@cluster0.hxsvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
        const meetups= await meetupCollection.find({},{_id:1}).toArray();
        client.close();
    return{ 
        fallback:false,

        // paths:[
        //     {
        //         params:{
        //             meetupId:'m1'
        //         }
        //     },
        //     {
        //         params:{
        //             meetupId:'m2'
        //         }
        //     }
        // ]
        paths:meetups.map((meetups)=>({
            params:{meetupId:meetups._id.toString()},
        }))
    }
    
}

export async function getStaticProps(context) {
    //fetch data for single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://mrsurajpokhrel:Greenland7D@cluster0.hxsvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const selectedMeetup = await meetupCollection.findOne({_id:ObjectId(meetupId)})
      
    console.log(meetupId);
    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                image:selectedMeetup.image,
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                description:selectedMeetup.description
            }
        }
    }
    
}

export default MeetupDetails;
