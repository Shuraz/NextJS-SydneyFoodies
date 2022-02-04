import { useRouter } from 'next/router';
import React from 'react';
import NewMeetupFrom from '../../components/meetups/NewMeetupForm'
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandle(enterMeetupData){
    //console.log(enterMeetupData);
    const response= await fetch('/api/new-meetup',{
        method:'POST',
        body:JSON.stringify(enterMeetupData),
        headers:{
          'Content-Type':'application/json'
        }
    });

    const data= response.json();
    console.log(data);
    router.push('/')
  }
  return (
  <NewMeetupFrom onAddMeetup={addMeetupHandle}/>

  )
}

export default NewMeetupPage;
