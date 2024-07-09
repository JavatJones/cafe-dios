"use client"

import React from 'react'


interface Location {
    url: string;
}

const MapGoogle = ({ url }: Location) => {
    return (

        <div className='flex flex-col'>
            <iframe
               className='w-full h-96 lg:h-[500px]'
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAwIDnc0YsxIUy6wEKlVFKX4TAaN5AjoRc&q=${url}`}
                allowFullScreen
            >
            </iframe>
        </div>

    )
}

export default MapGoogle