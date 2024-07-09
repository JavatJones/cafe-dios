import React from 'react'
import { postBySlug } from '@/data/blog';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  }
}

interface BlogParams {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  created_at: Date;
  keywords: string[];
}



// Dynamic metadata
export async function generateMetadata({ params }: Props) {

  const post: BlogParams | null = await postBySlug(params.slug);


  if (!post) {
    return {
      title: 'Artículo no encontrado',
      description: "Error #404 artículo no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.content,
  }
}


const BlogIdPage = async ({ params }: Props) => {


  const post: BlogParams | null = await postBySlug(params.slug);


  if (!post) {
    return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center gap-5'>
        <h1 className=''>Artículo no encontrado</h1>
        <h2>Error #404</h2>
        <Link href={`/blog`} className='underline'>Volver</Link>
      </div>
    )
  }


  const createdAt = new Date(post.created_at);

  return (
    <section className='container pt-10 flex flex-col space-x-5'>
      <article className='flex flex-col w-12/12 gap-20'>
        <p className='text-right'>Fecha: {createdAt.toLocaleDateString("es-MX")}</p>
        <h1 className='font-medium text-2xl rexa'>{post.title}</h1>


        {
          post.imageUrl !== "no-disponible.png" ?

            <picture className='flex items-center justify-center'>
              <img
                alt={post.title}
                className=''
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${post.imageUrl}`}
              >
              </img>
            </picture>

            :
            null
        }


        <p>{post.content}</p>

      </article>

    </section>
  )
}


export default BlogIdPage

