import Link from 'next/link'
import React from 'react'

const NavbarPhone = () => {
    return (
        <div className='container'>
            <Link href={"/admin"}>
                <p className='font-bold text-2xl truncate'>Cafetería</p>
            </Link>
        </div>
    )
}

export default NavbarPhone