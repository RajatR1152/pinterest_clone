'use client'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getDoc, getFirestore, query, where } from 'firebase/firestore'
import app from '@/app/shared/fireBaseConfig';
import PinsList from '@/components/pins/PinsList';

export default function page() {

    const { data: session } = useSession();

    const db = getFirestore(app);
    const param = useParams();
    const [userData, setUserData] = useState({});
    const [pinsList, setPinsList] = useState([]);


    useEffect(() => {
        getUserInfo(param.user.replace('%40', "@"));
    }, [userData]);

    const getUserInfo = async (email) => {

        const docRef = doc(db, "user", email)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserData(docSnap.data());
        }
        else {
            console.log("no such data")
        }
    }

    useEffect(() => {
        getUserPins();
    }, [])

    const getUserPins = async () => {
        const q = query(collection(db, 'posts'), where("email", "==", param.user.replace('%40', "@")));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            setPinsList(pinsList => [...pinsList, doc.data()]);
        })
    }

    return (
        <div className="w-full">
            <div className="container w-full items-center flex flex-col gap-3">
                <img src={userData.userImg} alt="" className="rounded-full" width={150} height={150} />
                <p className="text-2xl font-bold text-gray-700">{userData.userName}</p>
                <p className="text-gray-600 font-semibold">{userData.email}</p>
                <div className="w-fit flex gap-4 flex-row">
                    <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">share</button>
                    {
                        session?.user.email === userData.email ?
                            <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">follow</button>
                            :
                            null
                    }
                </div>
                <div className="contianer w-fit flex flex-row gap-3">
                    <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">created</button>
                </div>
            </div>

            {
                pinsList.length > 0 ?
                    <PinsList data={pinsList} />
                    :
                    <div className="container mt-40 text-center w-full">
                        <h1 className="font-bold text-4xl text-center text-gray-700">No post yet</h1>
                    </div>

            }

        </div>



    )
}
