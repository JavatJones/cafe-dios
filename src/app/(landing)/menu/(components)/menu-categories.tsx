import React from 'react'
import { allCategoriesN1, allCategoriesN2ById } from '@/data/menu';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
//temporal
import coffee from "@/assets/images/errorcoffe.svg"


interface subCategoryProp {
    id: string
}

interface CategoriesN2 {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
}

const MenuCategories = async ({ id }: subCategoryProp) => {

    const CategoriesN2: CategoriesN2[] | null = await allCategoriesN2ById(id)

    if (!CategoriesN2) {
        return (
            null
        )
    }


    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            {CategoriesN2?.map((category) => (

                <Link key={category.id} href={`/menu/${category.slug}`} className='group'>
                    <section className='flex flex-col space-y-5 items-center'>
                        <img
                            alt={category.name}
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${category.imageUrl}`}
                           
                            className='w-52 h-52 group-hover:scale-110 transition duration-300 object-cover object-center rounded-full'
                        />
                        <article>
                            <p>{category.name}</p>
                        </article>
                    </section>
                </Link>

            ))}
        </div>
    )
}

export default MenuCategories