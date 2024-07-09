import React from 'react'
export const dynamic = 'force-dynamic'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

//Data Quaeris
import { allStores } from "@/data/stores"
import { DataTable } from './(components)/data-table'
import { schema, columns } from "./(components)/columns"


async function getAllStores(): Promise<schema[]> {
    // Fetch data from your API here.
    const info = await allStores();

    if (!info) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }


    return info.map((dt: schema) => ({
        id: dt.id,
        name: dt.name,
        address: dt.address,
        url: dt.url,
    }));
}




const StoresPage = async () => {

    const data = await getAllStores()


    return (
        <div className='container flex flex-col space-y-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Tiendas</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex flex-col'>
                <DataTable data={data} columns={columns}></DataTable>
            </div>
        </div>
    )
}

export default StoresPage