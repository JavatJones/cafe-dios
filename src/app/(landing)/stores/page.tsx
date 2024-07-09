import React from 'react'

import MapGoogle from './(components)/map'
import MapFilter, { dataLocationsMapSchema } from './(components)/map-filter'
import { allStores } from '@/data/stores'

// Dynamic metadata
export async function generateMetadata() {
  return {
    title: "Tiendas",
    description: "Todas las ubicaciones de cafetería desde que Dios amanece",
  }
}

interface data {
  id: string;
  name: string;
  address: string;
  url: string;
}


async function getdata(): Promise<data[]> {
  // Fetch data from your API here.
  const data = await allStores();

  if (!data) {
    // Manejar el caso en que loads sea null
    console.error('Error: No se pudo obtener la carga');
    return [];
  }

  return data.map((dt: data) => ({
    id: dt.id,
    name: dt.name,
    address: dt.address,
    url: dt.url
  }));
}


const StoresPage = async () => {




  const locations = await getdata()

  return (
    <div className='container pt-5 flex w-full lg:min-h-screen '>
      <MapFilter locations={locations}></MapFilter>

    </div>
  )
}

export default StoresPage