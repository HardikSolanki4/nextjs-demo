import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const Home = (props) => {
  return (
    <Fragment>
      <Head>
        <title>MeetUp </title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// INFO: SSR: Server Site Render
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // console.log('req', req);
//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

// INFO: SSG: Static Site Generation
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://hardy:hardy!!123@cluster0.lbgbb.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetupData = await meetupCollection.find().toArray();
  const sendMeetupsData = meetupData.map((item) => ({
    title: item.title,
    address: item.address,
    image: item.image,
    id: item._id.toString(),
  }));
  client.close();

  // fetch data from API
  return {
    props: {
      meetups: sendMeetupsData,
    },
    revalidate: 1,
  };
}

export default Home;
