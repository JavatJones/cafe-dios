import Link from 'next/link'
import React from 'react'
import NavbarExtra from '../navbar-extra'

const NavbarPC = () => {
    return (
        <div className='container flex flex-row items-center justify-between w-full'>
            <Link href={"/admin"}>
                <p className='font-bold text-2xl truncate'>Cafetería</p>
            </Link>
            <NavbarExtra></NavbarExtra>
        </div>
    )
}

export default NavbarPC