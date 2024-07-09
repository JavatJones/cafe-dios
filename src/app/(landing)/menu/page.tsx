import React from 'react'
import { allCategoriesN1 } from '@/data/menu';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import MenuCategories from './(components)/menu-categories';
import Image from 'next/image';
export const dynamic = 'force-dynamic'
import errorcoffe from "@/assets/images/errorcoffe.svg"
// Dynamic metadata
export async function generateMetadata() {
  return {
    title: "Menú",
    description: "Menú de cafetería desde que Dios amanece",
  }
};


const MenuPage = async () => {

  const CategoriesN1 = await allCategoriesN1();

  if (!CategoriesN1) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5">
        <Image
          alt="error"
          src={errorcoffe.src}
          width={100}
          height={100}
        ></Image>
        <h1 className='font-bold'>Vuelve proximamente!</h1>
        <Link href={`/`} className='underline'>Volver al inicio</Link>
      </div>
    );
  }


  return (
    <div className='container pt-10 flex flex-col space-y-5'>
      <div>
        <h1 className='text-center text-xl lg:text-4xl font-bold'>Menú</h1>
      </div>
      <div className='grid grid-cols-1 space-y-8'>
        {CategoriesN1?.map((category) => (
          <div key={category.id} className="flex flex-col space-y-5">
            <Separator orientation='horizontal'></Separator>
            <h2 className="font-bold">{category.name}</h2>
            <Separator orientation='horizontal'></Separator>
            <MenuCategories id={category.id}></MenuCategories>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPage