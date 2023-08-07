'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import app from '../shared/fireBaseConfig';
import UserInfo from '@/components/UserInfo';
import PinsList from '@/components/pins/PinsList';
import { collection, doc, getDocs, getDoc, getFirestore, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react';

export default function page() {

    const { data: session } = useSession();


    const db = getFirestore(app);
    const param = useParams();
    const [userData, setUserData] = useState();
    const [pinsList, setPinsList] = useState([]);


    useEffect(() => {
        getUserInfo(param.userId.replace('%40', "@"));
    }, [UserInfo]);

    const getUserInfo = async (email) => {
        const docRef = doc(db, "user", email)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserData(docSnap.data())
        }
        else {
            console.log("no such data")
        }
    }

    useEffect(() => {
        if (UserInfo) {
            getUserPins();
        }
    }, [UserInfo])

    const getUserPins = async () => {
        if (session) {
            const q = query(collection(db, 'posts'), where("email", "==", session?.user.email));

            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                setPinsList(pinsList=>[...pinsList,doc.data()]);
            })
        }
    }

    return (
        <div className='h-screen overflow-auto'>
            {
                userData ? (
                    <UserInfo data={userData} />
                )
                    :
                    null
            }
            <PinsList data={pinsList} />
        </div>
    )
}
