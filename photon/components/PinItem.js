import React from 'react'
import Link from 'next/link'

export default function PinItem({ data }) {

    return (
        <div className="w-full mt-3">

            <div className="container w-full">
                <div className="h-fit group">

                    <div className="relative">
                        <Link href={`/img/${data.id}`} className="w-full">
                            <div className='relative'>
                                <img src={data.image} alt="" className="h-auto object-cover w-full" />
                            </div>
                            <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            </div>
                            <h1 className="text-2xl text-center capitalize font-semibold my-3">{data.title}</h1>
                        </Link>
                    </div>

                    <div className="flex w-full lg:w-fit justify-center items-center gap-2 md:gap-3 lg:gap-5 flex-row p-2">
                        <Link className='flex flex-row gap-3' href={`/search-user/${data.email}`}>
                            <img src={data.authorImg} alt="" className="rounded-full w-10 h-10 lg:w-12 lg:h-12" />
                            <div className="container">
                                <h2 className="md:text-xl xl:text-xl lg:text-xl font-semibold text-gray-800">{data.author}</h2>
                                <h3 className="text-sm lg:text-md font-semibold text-gray-600">{data.email}</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
