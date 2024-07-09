import React from 'react'
import { getAllPosts } from '@/data/blog'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';



// Dynamic metadata
export async function generateMetadata() {
  return {
    title: "Blog",
    description: "Blog de cafetería desde que Dios amanece",
  }
}


interface PostSchema {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  created_at: Date;
}

const BlogPage = async () => {

  const posts: PostSchema[] | null = await getAllPosts()


  if (!posts) {
    return (
      <div className='container'>
        <p>BlogPage</p>
        <p>nO SE ENCONTRO NA</p>
      </div>
    )
  }

  return (
    <div className='container pt-10 space-y-10'>
      <h1 className='capitalize text-2xl font-bold'>
        Blog de cafeteria desde que dios amanece
      </h1>
      <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        {posts.map((data, index) => (
          <Link key={index} href={`/blog/${data.slug}`} >
            <Card>
              <CardHeader>
                <picture>
                  <img
                    alt={data.title}
                    className='w-full min-h-56 object-cover'
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${data.imageUrl}`}
                  >
                  </img>
                </picture>
              </CardHeader>
              <CardContent>

                <p>{data.title}</p>

              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>

    </div>
  )
}

export default BlogPage