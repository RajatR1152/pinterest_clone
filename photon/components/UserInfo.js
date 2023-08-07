import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function UserInfo({ data }) {

    const router = useRouter();
    const { data: session } = useSession();

    function logOut() {
        signOut();
    }

    if (!session) {
        router.push('/');
    }

    return (
        <div className="container w-full items-center flex flex-col gap-3">
            <img src={data.userImg} alt="" className="rounded-full" width={150} height={150} />
            <p className="text-2xl font-bold text-gray-700">{data.userName}</p>
            <p className="text-gray-600 font-semibold">{data.email}</p>
            <div className="w-fit flex gap-4 flex-row">
                <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">share</button>
                {
                    session?.user.email === data.email ?
                        <button onClick={() => { logOut() }} className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">log out</button>
                        :
                        null
                }
            </div>
            <div className="contianer w-fit flex flex-row gap-3">
                <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">created</button>
                <button className="bg-gransparent font-semibold p-5">saved</button>
            </div>
        </div>
    )
}
