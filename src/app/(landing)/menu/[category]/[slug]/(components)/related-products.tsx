import * as React from "react"
import { AllProductsByCategory, subcategoryBySlug } from '@/data/menu';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
//images
import errorcoffe from "@/assets/images/errorcoffe.svg"
import Link from "next/link";

interface Props {
    params: {
        category: string;
        slug: string;
    }
}


interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: string;
    slug: string;
    imageUrl: string;
}


const RelatedProducts = async ({ params }: Props) => {

    const subCategory = await subcategoryBySlug(params.category);

    const products: ProductProps[] | null = await AllProductsByCategory(subCategory.id);


    return (
        <section className="flex flex-col space-y-5 w-full">
            <article>
                <h3 className="font-medium text-xl">Productos relacionados</h3>
            </article>



            <Carousel className="w-full ">
                <CarouselContent className="-ml-1 px-10">
                    {products?.map((data, index) => (
                        <CarouselItem key={index} className="relative pl-1 md:basis-1/2 lg:basis-3/12">
                            <Link href={`/menu/${params.category}/${data.slug}`} className="relative p-1">
                                <Card>
                                    <CardContent className="relative flex flex-col aspect-square items-center justify-center gap-5 p-6">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${data.imageUrl}`}
                                            alt={data.name}
                                            className='w-52 h-52 group-hover:scale-110 transition duration-300 object-cover object-center rounded-full'
                                        ></img>



                                        {/* <span className="text-2xl font-semibold">{index + 1}</span> */}
                                        <span className="text-md font-medium line-clamp-1">{data.name}</span>
                                        <span className="text-md font-normal line-clamp-1">$ {data.price}</span>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>



        </section >
    )
}

export default RelatedProducts