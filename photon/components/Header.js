'use client'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiBell, HiChat, HiMenu } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { useSession, signIn, signOut } from "next-auth/react"
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import app from '@/app/shared/fireBaseConfig'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function Header() {

    const router = useRouter();
    const [showNavs, setShowNavs] = useState(false);
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [search, setSearch] = useState('');

    useEffect(() => {
        saveUserInfo();
    }, [session])

    const saveUserInfo = async () => {
        if (session?.user) {
            await setDoc(doc(db, 'user', session.user.email), {
                userName: session.user.name,
                email: session.user.email,
                userImg: session.user.image
            })
        }
    }

    function create() {
        if (session) {
            router.push('/create-pin');
        }
        else {
            router.push('/');
        }
    }

    return (
        <>
            <div className="w-full hidden md:flex gap-3 md:gap-2 items-center p-3">
                <Link href={'/'} className='bg-black text-white px-5 py-3 rounded-full'>Home</Link>
                <button onClick={() => { create() }} className='bg-black text-white px-5 py-3 rounded-full'>Create</button>
                <div className="bg-slate-200 hidden w-full justify-center items-center rounded-full p-2 gap-3  md:flex">
                    <Link href={`search-user/${search}`}><FiSearch className='ms-3' size={30} /></Link>
                    <input type="text" onChange={(e) => { setSearch(e.target.value) }} placeholder='search user by email address ...' className='p-2 w-full focus:outline-none bg-transparent' />
                </div>
                <HiBell className='p-2 w-20 hover:bg-gray-200 rounded-full' size={60} />
                <HiChat className='p-2 w-20 hover:bg-gray-200 rounded-full' size={60} />
                {
                    session && session.user ? (
                        <div className="flex gap-4 ml-auto">
                            <Link href={`/${session.user.email}`}><img src={session?.user?.image} alt="" className="w-16 h-12 rounded-full" /></Link>
                        </div>
                    ) :
                        (

                            <button onClick={() => signIn()} className='bg-black text-white px-5 py-3 rounded-full'>Login</button>
                        )

                }
            </div>

            <div className="mt-4 md:hidden block">
                {
                    showNavs ?
                        (<RxCross2 onClick={() => { setShowNavs(false) }} size={30} />)
                        :
                        (<HiMenu onClick={() => { setShowNavs(true) }} size={30} />)
                }

            </div>
            {
                showNavs ? (
                    <div className="w-full h-fit md:hidden block justify-center gap-3 md:gap-2 items-center p-6">
                        <button className='bg-black text-white w-full px-5 py-3 mt-4'><Link href={'/'} >Home</Link></button>
                        <button onClick={() => { create()}} className='bg-black text-white w-full px-5 py-3 mt-4'>Create</button>
                        <div className="bg-slate-200 w-full justify-center items-center rounded-full p-2 gap-3  my-4 flex">
                            <Link href={`search-user/${search}`}><FiSearch className='ms-3' size={30} /></Link>
                            <input type="text" placeholder='search...' onChange={(e) => { setSearch(e.target.value) }} className='p-2 w-full focus:outline-none bg-transparent' />
                        </div>
                        <div className="container w-full flex p-2">
                            <HiBell className='p-2 w-20 hover:bg-gray-200 rounded-full' size={60} />
                            <HiChat className='p-2 w-20 hover:bg-gray-200 rounded-full' size={60} />
                            {
                                session && session.user ? (
                                    <div className="flex gap-4 justify-center items-center ml-auto">
                                        <Link href={`/${session.user.email}`}><img src={session?.user?.image} alt="" className="w-12 h-12 rounded-full" /></Link>
                                    </div>
                                ) :
                                    (
                                        <button onClick={() => signIn()} className='bg-black w-full text-white px-5 py-3'>Login</button>
                                    )

                            }
                        </div>
                    </div >
                ) :
                    (<></>)
            }

        </>

    )
}
