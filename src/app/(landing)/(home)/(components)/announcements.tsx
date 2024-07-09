"use client"
import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export interface AnnouncementsProps {
    Announcements: {
        id: string;
        imageUrl: string;
    }[];
}

const Announcements = ({ Announcements }: AnnouncementsProps) => {

    const plugin = React.useRef(
        Autoplay({ delay: 10000, stopOnInteraction: true })
    )

    return (
        <div className='flex flex-col'>


            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>


                    {Announcements.map((data, index) => (
                        <CarouselItem key={index} className='w-full'>
                            <img
                                alt='Oferta'
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${data.imageUrl}`}
                                className="w-full lg:h-auto object-cover"
                            ></img>

                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        </div>
    )
}

export default Announcements