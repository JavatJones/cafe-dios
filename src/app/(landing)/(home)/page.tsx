import React from 'react'
import Announcements from './(components)/announcements'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'


//template images
//images 
import coffee_menu from "@/assets/images/coffee_menu.webp"
import coffee_store from "@/assets/images/coffee_store.webp"
import coffee_book from "@/assets/images/coffee_book.webp"

//data
import { getAllAnnouncementsByOrder } from "@/data/announcements"


const HomePage = async () => {

  const announcements = await getAllAnnouncementsByOrder()

  return (
    <div className='flex flex-col space-y-10'>

      <Announcements Announcements={announcements}></Announcements>

      <section className='container grid grid-cols-1 lg:grid-cols-3 gap-10'>

        <Link href={"/menu"} className='group hover:scale-105 transition duration-300'>
          <Card>
            <div className='flex flex-col items-center justify-center h-full w-full p-10 space-y-5'>

              <Image
                src={coffee_menu.src}
                height={100}
                width={200}
                alt='Cafetería Desde que Dios amanece Menú'
                className='rounded-full border-4 border-white drop-shadow-2xl'
              ></Image>
              <p className='font-semibold text-lg text-center'>Nuestro menú</p>
            </div>
          </Card>
        </Link>

        <Link href={"/stores"} className='group hover:scale-105 transition duration-300'>
          <Card>
            <div className='flex flex-col items-center justify-center h-full w-full p-10 space-y-5'>

              <Image
                src={coffee_store.src}
                height={100}
                width={200}
                alt='Cafetería Desde que Dios amanece Tiendas'
                className='rounded-full border-4 border-white drop-shadow-2xl'
              ></Image>
              <p className='font-semibold text-lg text-center'>Nuestras sucursales</p>
            </div>
          </Card>
        </Link>

        <Link href={"/about"} className='group hover:scale-105 transition duration-300'>
          <Card>
            <div className='flex flex-col items-center justify-center h-full w-full p-10 space-y-5'>

              <Image
                src={coffee_book.src}
                height={100}
                width={200}
                alt='Cafetería Desde que Dios amanece'
                className='rounded-full object-cover border-4 border-white drop-shadow-2xl'
              ></Image>
              <p className='font-semibold text-lg text-center'>Nuestra historia</p>
            </div>
          </Card>
        </Link>

      </section>

    </div >
  )
}

export default HomePage