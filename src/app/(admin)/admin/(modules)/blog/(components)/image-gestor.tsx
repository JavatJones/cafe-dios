"use client";
import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'


interface getThings {
    id: string;
    imageUrl: string;
}

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; //shadcn ui folder
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsImages, BsPaperclip } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import { toast } from 'react-toastify'
import Image from 'next/image';


const ImageGestorUploader = ({ id, imageUrl }: getThings) => {

    const router = useRouter()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {

        let file
        if (e.target.files) {
            file = e.target.files[0];
        }

        console.log(file)

        try {

            const supabase = createClient();

            const { data, error } = await supabase.storage
                .from("Images")
                .upload("item/" + Math.random() + file?.name, file as File)


            if (data) {
                const path = data.path

                if (imageUrl !== "no-disponible.png") {
                    const { data, error } = await supabase.storage
                        .from("Images")
                        .remove([imageUrl])

                }
            }

            if (data) {
                const path = data.path
                const response = await supabase.from("posts")
                    .update({ imageUrl: path })
                    .eq("id", id)
                router.refresh()
                toast.success("Imagen actualizada")
                router.refresh()
            }
            if (error) {
                toast.error("Error en imagen")
            }
            router.refresh()
        } catch (error) {
            toast.error("Error")
        }

    };

    const handleDelete = async () => {


        try {

            const supabase = createClient();

            if (imageUrl !== "no-disponible.png") {
                const { data, error } = await supabase.storage
                    .from("Images")
                    .remove([imageUrl])

                if (data) {
                    // toast.success("Imagen actualizada")
                    const response = await supabase.from("posts")
                        .update({ imageUrl: "no-disponible.png" })
                        .eq("id", id)
                    if (response.data) {

                        toast.success("Imagen actualizada")
                    }
                    if (response.data) {
                        toast.error("Error")
                    }
                }
                if (error) {
                    toast.error("Error")
                }
            }

        } catch (error) {
            toast.error("Error")
        }
        router.refresh()
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className='w-full'>
                    Gestionar imagen
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='truncate'>Gestionar imagen de post</DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-5 items-center'>

                    <div className='relative'>
                        <Image
                            alt={imageUrl}
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${imageUrl}`}
                            width={200}
                            height={200}
                            className='relative group-hover:scale-110 transition duration-300'
                        ></Image>
                        {imageUrl === "no-disponible.png" ?
                            null
                            :
                            <div className='absolute -top-2 -right-2'>
                                <Button variant={'destructive'} size={'icon'} onClick={() => {
                                    handleDelete();
                                }}
                                >
                                    X
                                </Button>
                            </div>
                        }

                    </div>

                    <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"

                        onChange={(e) => {
                            handleUpload(e);
                        }}

                    />
                    <label
                        htmlFor="fileInput"
                        className="text-neutral-90 text-white text-center p-2 bg-black rounded-md flex justify-center cursor-pointer items-center"
                    >
                        <BsPaperclip />
                        <span className="">
                            Cambiar imagen
                        </span>
                    </label>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ImageGestorUploader