import React from 'react'
import NavbarPhoneComponent from './navbar-phone/navbar-phone'
import NavbarPcComponent from './navbar-pc/navbar-pc'

const NavbarSelector = async () => {
    return (
        <header className='fixed top-0 py-3 z-50 w-full bg-background drop-shadow-lg'>
            <section>
                {/* pc */}
                <nav className='hidden lg:flex'>
                    <NavbarPcComponent></NavbarPcComponent>
                </nav>

                {/* phone */}
                <nav className='flex lg:hidden'>
                    <NavbarPhoneComponent></NavbarPhoneComponent>
                </nav>
            </section>
        </header>
    )
}

export default NavbarSelector