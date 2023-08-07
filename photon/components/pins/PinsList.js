'use client'
import React from 'react'
import PinItem from '../PinItem';

export default function PinsList({ data }) {

    return (
        <div className="md:columns-3 lg:columns-3 xl:columns-4 mt-10 w-screen">
            {
                data.map((d, i) => {
                    return (
                        <div className='bg-slate-200 p-2 my-5 rounded-lg h-fit' key={i}>
                            <PinItem data={d} />
                        </div>
                    )
                })

            }
        </div>
    )
}
