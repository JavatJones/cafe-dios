import React from 'react'

//icons
import { SiUbereats } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

//components
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import Image from 'next/image';
import Logo from "@/assets/icon/logo.webp"

const footer = async () => {
  return (
    <footer className='container py-5 space-y-10 flex flex-col'>
      <div className='flex flex-row gap-5 items-center'>
        <div className='w-full'>
          <Separator />
        </div>
        <div className="grid grid-flow-col gap-10 auto-cols-max">
          <a href={"https://www.instagram.com/desde.que.dios.amanece"} target="_blank" rel="noopener noreferrer">
            <IoLogoInstagram className='hover:scale-110 transition duration-300 hover:text-rose-500' size={30} /></a>
          <a href={"https://www.facebook.com/p/Cafeter%C3%ADa-Desde-que-Dios-amanece-100082070392030"} target="_blank" rel="noopener noreferrer">
            <FaFacebook className='hover:scale-110 transition duration-300 hover:text-blue-700' size={30} /></a>
          <a href={"https://www.ubereats.com/mx/store/desde-que-dios-amanece/hM7kI15CWOmPqGPHfISa0g"} target="_blank" rel="noopener noreferrer">
            <SiUbereats className='hover:scale-110 transition duration-300 hover:text-emerald-700' size={30} />
          </a>
        </div>
        <div className='w-full'>
          <Separator />
        </div>
      </div>

      <div className='flex flex-col space-y-10 items-center justify-center'>
        {/* icon */}
        <Link href={"/"}>
          <Image
            src={Logo.src}
            alt='Cafetería Desde que Dios amanece'
            width={90}
            height={90}
            className='hover:scale-105 transition duration-300'
          ></Image>
        </Link>

        <p className='font-light text-sm'>
          Copyright @ 2024 Cafetería Desde que Dios amanece
        </p>
      </div>
    </footer>
  )
}

export default footer