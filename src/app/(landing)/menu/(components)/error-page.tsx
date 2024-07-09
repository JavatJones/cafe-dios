import Image from 'next/image'
import React from 'react'
//images
import errorcoffe from "@/assets/images/errorcoffe.svg"
import Link from 'next/link'


const Error404Menu = () => {
    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center gap-5'>
            <Image
                alt="error"
                src={errorcoffe.src}
                width={100}
                height={100}
            ></Image>
            <h1 className='font-bold'>Producto no encontrado</h1>
            <Link href={`/menu`} className='underline'>Volver</Link>
        </div>
    )
}

export default Error404Menu