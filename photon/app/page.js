'use client'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getDoc, getFirestore, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react';
import PinsList from '@/components/pins/PinsList';
import Spinner from '@/components/Spinner';
import app from './shared/fireBaseConfig';

export default function page() {

  const { data: session } = useSession();


  const db = getFirestore(app);
  const [pinsList, setPinsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPins();
  }, [])

  const getPins = async () => {
    const q = query(collection(db, 'posts'));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setPinsList(pinsList => [...pinsList, doc.data()]);
      setLoading(false);
    })

  }

  return (
    <>
      {
        loading ?
          <div className="container mt-44 p-5">
            <Spinner size={30} color={'black'} />
          </div>
          :
          <PinsList data={pinsList} />
      }
    </>
  )
}

