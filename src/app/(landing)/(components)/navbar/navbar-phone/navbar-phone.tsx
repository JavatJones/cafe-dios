import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
 
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { RxHamburgerMenu } from "react-icons/rx";
import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/assets/icon/logo.webp"

const NavbarPhoneComponent = async () => {
    return (
        <div className='container flex flex-row items-center justify-between'>
            {/* icon */}
            <Link href={"/"} >
                <Image
                    src={Logo.src}
                    alt='Cafeteria Desde Que Dios Amanece'
                    width={80}
                    height={80}
                    className='hover:scale-105 transition duration-300'
                ></Image>
            </Link>
            {/* drawler */}

            <Drawer>
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size={25} />
                </DrawerTrigger>
                <DrawerContent className='mx-auto w-full max-w-md flex flex-col h-3/5'>
                    <DrawerHeader className='flex flex-col '>
                        <DrawerTitle className='text-center'>Navegación</DrawerTitle>
                    </DrawerHeader>



                    <div className="flex flex-col gap-5 p-2 h-6/6 overflow-y-auto">

                        <Button variant={'outline'} asChild>
                            <Link href={"/"}>
                                Inicio
                            </Link>
                        </Button>

                        <Button variant={'outline'} asChild>
                            <Link href={"/menu"}>
                                Menú
                            </Link>
                        </Button>

                        <Button variant={'outline'} asChild>
                            <Link href={"/stores"}>
                                Sucursales
                            </Link>
                        </Button>

                        <Button variant={'outline'} asChild>
                            <Link href={"/about"}>
                                Nosotros
                            </Link>
                        </Button>


                        <Button variant={'outline'} asChild>
                            <Link href={"/blog"}>
                                Blog
                            </Link>
                        </Button>



                    </div>


                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Volver</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default NavbarPhoneComponent