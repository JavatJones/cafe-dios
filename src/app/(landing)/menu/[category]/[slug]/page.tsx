import React from 'react'
import { productBySlug, subcategoryBySlug } from '@/data/menu';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

//images
import errorcoffe from "@/assets/images/errorcoffe.svg"
import Error404Menu from '../../(components)/error-page';
import RelatedProducts from './(components)/related-products';

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


// Dynamic metadata
export async function generateMetadata({ params }: Props) {

    const category = await subcategoryBySlug(params.category)
    const product = await productBySlug(params.slug);

    if (!category) {
        return {
            title: 'Producto no encontrado',
            description: "Error #404 producto no encontrado",
        }
    }

    if (!product) {
        return {
            title: 'Producto no encontrado',
            description: "Error #404 producto no encontrado",
        }
    }

    return {
        title: product.name,
        description: product.description,
    }
}


const ProductPage = async ({ params }: Props) => {


    const category = await subcategoryBySlug(params.category)
    if (!category) {
        return (
            <Error404Menu></Error404Menu>
        )
    };

    const product: ProductProps = await productBySlug(params.slug);
    if (!product) {
        return (
            <Error404Menu></Error404Menu>
        )
    };

    return (
        <div className='container pt-10 flex flex-col space-y-24'>
            <div className='flex flex-col space-y-5'>
                <div className='flex flex-row space-x-2 items-center'>
                    <Link href={`/menu`} className='font-light text-md'>Menú</Link>
                    <p className='font-medium text-md'>/</p>
                    <Link href={`/menu/${category.slug}`} className='font-medium text-md'>{category.name}</Link>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex w-12/12 lg:w-6/12 items-center justify-center'>
                    <Image
                        alt={product.name}
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${product.imageUrl}`}
                        width={300}
                        height={300}
                    ></Image>
                </div>

                <div className='flex flex-col w-12/12 lg:w-6/12 space-y-5 justify-center'>
                    <h1 className='text-4xl font-bold'>{product.name}</h1>
                    <p className='text-xl font-md'>{product.description}</p>
                    <p className='text-4xl font-bold'>$ {product.price} MXN</p>
                </div>
            </div>

            <RelatedProducts params={params}></RelatedProducts>

        </div>
    )
}


export default ProductPage