import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

function MeetupIdDetails(props) {
  console.log(props);
  return (
    <Fragment>
      <Head>
        <title>Meetup Details</title>
      </Head>
      <MeetupDetails
        image={props.meetupDetails.image}
        title={props.meetupDetails.title}
        address={props.meetupDetails.address}
        description={props.meetupDetails.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // connect to DB
  const client = await MongoClient.connect(
    'mongodb+srv://hardy:hardy!!123@cluster0.lbgbb.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  const meetupsPaths = meetups.map((item) => ({
    params: {
      meetupId: item._id.toString(),
    },
  }));

  console.log('meetupsPaths', meetupsPaths);

  return {
    // See the "paths" section below
    paths: meetupsPaths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // connect to DB
  const client = await MongoClient.connect(
    'mongodb+srv://hardy:hardy!!123@cluster0.lbgbb.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  return {
    props: {
      meetupDetails: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    }, // will be passed to the page component as props
  };
}
export default MeetupIdDetails;
