import React from 'react'
import { subcategoryBySlug, AllProductsByCategory } from '@/data/menu';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Error404Menu from '../(components)/error-page';
//temporal
import coffee from "@/assets/images/errorcoffe.svg"
import errorImage from "@/assets/images/image-svgrepo-com.svg"

export const dynamic = 'force-dynamic'
interface Props {
    params: {
        category: string;
    }
}


// Dynamic metadata
export async function generateMetadata({ params }: Props) {

    const subCategory = await subcategoryBySlug(params.category);


    if (!subCategory) {
        return {
            title: 'Producto no encontrado',
            description: "Error #404 producto no encontrado",
        }
    }

    return {
        title: subCategory.name,
        description: subCategory.description,
    }
}


const categoriesPage = async ({ params }: Props) => {

    const subCategory = await subcategoryBySlug(params.category);

    if (!subCategory) {
        return (
            <Error404Menu></Error404Menu>
        )
    }

    const productsByCategory = await AllProductsByCategory(subCategory.id)


    return (
        <div className='container pt-10 flex flex-col gap-5'>


            <div className='flex flex-col space-y-5'>
                <div className='flex flex-r ow space-x-2'>
                    <Link href={`/menu`} className='font-light text-md'>Menú</Link>
                    <p>/</p>
                    <Link href={`/menu/${subCategory.slug}`} className='font-medium text-md'>{subCategory.name}</Link>
                </div>
                <h1 className='text-xl font-extrabold'>{subCategory.name}</h1>

            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {productsByCategory?.map((product) => (
                    <Link href={`/menu/${subCategory.slug}/${product.slug}`} key={product.id} className='group'>
                      


                        <section className='flex flex-col space-y-5 items-center'>
                            <img
                                alt={product.name}
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${product.imageUrl}`}
                              
                                className='w-52 h-52 group-hover:scale-110 transition duration-300 object-cover object-center rounded-full'
                            ></img>
                            <article>
                                <p className="font-bold">{product.name}</p>
                            </article>
                        </section>

                    </Link>

                ))}
            </div>

        </div>
    )
}


export default categoriesPage