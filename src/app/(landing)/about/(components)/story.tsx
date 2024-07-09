import Image from 'next/image'
import React from 'react'

//images
import coffee from "@/assets/images/cafe_demo1.webp"
import cafeteria from "@/assets/images/cafeteria.webp"
import items from "@/assets/images/coffee_items.webp"

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

            <article className='flex flex-col lg:flex-row gap-10'>
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

            <article className='flex flex-col lg:flex-row-reverse gap-10'>
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
                        className='drop-shadow-2xl rounded-lg'
                    ></Image>
                </picture>
            </article>


            {/* Masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default StoryAbout