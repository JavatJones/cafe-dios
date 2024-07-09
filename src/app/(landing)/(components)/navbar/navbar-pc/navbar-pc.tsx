import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/assets/icon/logo.webp"

const NavbarPcComponent = async () => {
    return (
        <div className='container flex flex-row items-center justify-between'>
            {/* icon */}
            <Link href={"/"}>
                <Image
                    src={Logo.src}
                    alt='Cafeteria Desde Que Dios Amanece'
                    width={100}
                    height={100}
                    className='hover:scale-105 transition duration-300'
                ></Image>
            </Link>

            <div className='flex flex-row space-x-5 items-center'>
                <Link href={"/"} className='hover:scale-110 transition duration-300'>Inicio</Link>
                <Link href={"/menu"} className='hover:scale-110 transition duration-300'>Menú</Link>
                <Link href={"/stores"} className='hover:scale-110 transition duration-300'>Sucursales</Link>
                <Link href={"/about"} className='hover:scale-110 transition duration-300'>Nosotros</Link>
                <Link href={"/blog"} className='hover:scale-110 transition duration-300'>Blog</Link>            
            </div>

        </div>
    )
}

export default NavbarPcComponent