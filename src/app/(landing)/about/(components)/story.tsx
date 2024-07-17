import Image from 'next/image'
import React from 'react'

//images
import coffee from "@/assets/images/cafe_demo1.webp"
import cafeteria from "@/assets/images/Tezza-6338.webp"
import test from "@/assets/images/6ff3cfc9-38ba-4d79-aab2-7306b74480b5.png"

import items from "@/assets/images/coffee_items.webp"

//gallery
import img1 from "@/assets/images/gallery/img1.webp"
import img2 from "@/assets/images/gallery/img2.webp"
import img3 from "@/assets/images/gallery/img3.webp"
import img4 from "@/assets/images/gallery/img4.webp"
import img5 from "@/assets/images/gallery/img5.webp"
import img6 from "@/assets/images/gallery/img6.webp"
import img7 from "@/assets/images/gallery/img7.webp"
import img8 from "@/assets/images/gallery/img8.webp"
import img9 from "@/assets/images/gallery/img9.webp"
import img10 from "@/assets/images/gallery/img10.webp"
import img11 from "@/assets/images/gallery/img11.webp"
import img12 from "@/assets/images/gallery/img12.webp"






const StoryAbout = () => {
    return (
        <section className='flex flex-col gap-32'>

            <article className='flex flex-col lg:flex-row gap-10'>
                <div className='flex flex-col w-12/12 lg:w-6/12 mx-auto gap-5'>
                    <h2 className='text-center font-medium text-2xl capitalize tracking-tight'>
                        Tu Refugio de Café
                    </h2>
                    <p className='text-justify tracking-widest text-lg'>
                        Explora cómo creamos un espacio acogedor donde cada taza de café cuenta una historia.
                        Descubre nuestros valores centrados en la calidad y la comunidad, diseñados para
                        ofrecerte una experiencia única en cada visita.
                    </p>
                </div>

            </article>

            <article className='flex flex-col lg:flex-row gap-10 items-center'>
                <div className='flex flex-col w-12/12 lg:w-6/12 gap-5'>
                    <h2 className='text-center font-medium text-2xl capitalize tracking-tight'>Nuestra Historia: Un Viaje a Través del Café</h2>
                    <p className='text-justify tracking-widest text-lg'>
                        Nuestra cafetería en el corazón de la ciudad es un lugar acogedor y vibrante,
                        donde cada taza de café cuenta una historia y cada visita se convierte en un recuerdo especial.
                        A lo largo de los años, hemos mantenido nuestro compromiso con la calidad del café y la
                        calidez del servicio para ofrecer momentos memorables a nuestra comunidad.
                    </p>
                </div>
                <picture className='flex w-12/12 lg:w-6/12 items-center justify-center'>
                    <Image
                        alt='Nuestra Historia: cafetería desde que dios amanece'
                        src={coffee.src}
                        width={500}
                        height={500}
                        className='drop-shadow-2xl rounded-lg'
                    ></Image>
                </picture>
            </article>

            <article className='flex flex-col lg:flex-row-reverse gap-10 items-center'>
                <div className='flex flex-col w-12/12 lg:w-6/12 gap-5'>
                    <h2 className='text-center font-medium text-2xl capitalize tracking-tight'>Valores y Experiencias: Más Allá del Café</h2>
                    <p className='text-justify tracking-widest text-lg'>
                        Para nosotros, el café es una oportunidad de conexión y creatividad.
                        Seleccionamos granos con cuidado de regiones sostenibles y apoyamos a pequeños productores.
                        En nuestra cafetería, ofrecemos un ambiente acogedor para momentos tranquilos y
                        conversaciones significativas, buscando que cada visita sea memorable para nuestros clientes.
                    </p>
                </div>
                <picture className='flex w-12/12 lg:w-6/12 items-center justify-center'>
                    <Image
                        alt='Valores y Experiencias: cafetería desde que dios amanece'
                        src={cafeteria.src}
                        width={500}
                        height={500}
                        className='h-[550px] object-cover drop-shadow-2xl rounded-lg'
                    ></Image>
                </picture>
            </article>


            {/* Masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img1.src} alt="1" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img2.src} alt="2" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img3.src} alt="3" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img4.src} alt="4" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img5.src} alt="5" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img6.src} alt="6" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img7.src} alt="7" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img8.src} alt="8" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img9.src} alt="9" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img10.src} alt="10" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img11.src} alt="11" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={img12.src} alt="12" />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default StoryAbout