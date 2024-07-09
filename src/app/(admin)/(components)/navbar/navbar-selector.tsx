import React from 'react'
import NavbarPhoneComponent from './navbar-phone/navbar-phone'
import NavbarPcComponent from './navbar-pc/navbar-pc'

const NavbarSelector = async () => {
    return (
        <header className='flex py-3 z-50 w-full bg-background drop-shadow-lg'>
            <section className='flex w-full'>
                {/* pc */}
                <nav className='hidden lg:flex w-full'>
                    <NavbarPcComponent></NavbarPcComponent>
                </nav>

                {/* phone */}
                <nav className='flex lg:hidden w-full'>
                    <NavbarPhoneComponent></NavbarPhoneComponent>
                </nav>
            </section>
        </header>
    )
}

export default NavbarSelector