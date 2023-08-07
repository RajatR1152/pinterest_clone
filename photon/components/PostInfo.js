import React from 'react'
import Link from 'next/link'

export default function PostInfo({ data }) {
    return (
        <div className="container w-screen md:p-5 h-screen bg-slate-200">
            <div className="md:w-10/12 w-full h-full flex flex-col rounded-3xl md:p-5 bg-transparent mx-auto xl:flex-row lg:flex-row md:flex-row">

                <div className="container md:w-5/12 md:rounded-s-3xl bg-red h-[100%] items-center  content-center justify-center">
                    <img src={data.image} className='w-full md:rounded-s-3xl  h-[100%] my-auto' alt="" />
                </div>

                <div className="container w-full md:rounded-e-3xl bg-white md:w-7/12 bg-red p-5 md:px-10 h-[100%]">

                    <div className="container mt-20 gap-3 mb-6 w-full">
                        <h1 className="text-4xl font-bold capitalize text-gray-900">{data.title}</h1>
                    </div>

                    <div className="container w-fit gap-3 flex flex-row items-center justify-center p-3">
                        <Link href={`/search-user/${data.email}`} className='gap-3 flex flex-row' >
                            <img src={data.authorImg} alt="" className="w-14 h-14 rounded-full" />
                            <div className="container">
                                <h1 className="text-xl font-semibold text-gray-700">{data.author}</h1>
                                <h1 className="text-md font-semibold text-gray-600">{data.email}</h1>
                            </div>
                        </Link>
                    </div>

                    <h1 className="text-xl font-bold capitalize text-gray-800 my-5">{data.description}</h1>

                    <button className="px-8 py-4 bg-gray-300 text-gray-800 font-bold text-xl rounded-full mt-20">
                        <a target="_blank" href={data.image} >open link...</a>
                    </button>


                </div>
            </div>
        </div>
    )
}
