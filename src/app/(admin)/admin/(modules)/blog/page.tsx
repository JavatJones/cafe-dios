import React from 'react'
import { getAllPosts } from '@/data/blog'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import DeletePost from './(components)/DeletePost';
import EditPost from './(components)/EditPost';
import CreatePost from './(components)/CreatePost';
import ImageGestorUploader from './(components)/image-gestor';



interface PostSchema {
    id: string;
    title: string;
    content: string;
    slug: string;
    imageUrl: string;
    created_at: Date;
    videoUrl: string;
}

const BlogPage = async () => {

    const posts: PostSchema[] | null = await getAllPosts()



    return (
        <div className='container flex flex-col space-y-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Blog</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex flex-row justify-end items-center'>
                <CreatePost></CreatePost>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                {posts?.map((data, index) => (
                    <Card key={index}>
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
                            <p className='truncate'>{data.title}</p>
                        </CardContent>
                        <CardFooter className='flex flex-col'>
                            {/* EDITAR */}
                            <EditPost id={data.id} title={data.title} content={data.content} videoUrl={data.videoUrl}></EditPost>
                            {/* IMAGEN */}
                            <ImageGestorUploader id={data.id} imageUrl={data.imageUrl}></ImageGestorUploader>
                            {/* ELIMINAR */}
                            <DeletePost id={data.id}></DeletePost>
                        </CardFooter>
                    </Card>

                ))}
            </section>
        </div>
    )
}

export default BlogPage