"use client"
import React, { useState } from 'react'

import MapGoogle from './map'
import Filter from './filter'


export interface dataLocationsMapSchema {

  locations: {
    id: string;
    name: string;
    address: string;
    url: string;
  }[]
}

const MapFilter = ({ locations }: dataLocationsMapSchema) => {

  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.url);


  if (locations.length <= 0) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='font-semibold text-4xl'>Proximamente!</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col lg:flex-row gap-5 w-full'>


      <div className="flex flex-col w-12/12 lg:w-6/12 p-4 lg:border-r border-gray-300">
        <Filter locations={locations} onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
      </div>
      <div className="flex flex-col w-12/12 lg:w-6/12 p-4">
        <MapGoogle url={selectedLocation} />
      </div>

    </div>
  )
}

export default MapFilter