"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateProductSchema } from "@/schemas/admin/menu"
import CreateAction from '@/actions/admin/menu/Products/create'

//ui
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTransition } from 'react'
import { toast } from 'react-toastify'
import { BsImages, BsPaperclip } from "react-icons/bs";
import { Textarea } from '@/components/ui/textarea';

interface CreateProps {
    categories: {
        id: string;
        name: string;
    }[]
}



const CreateProduct = ({ categories }: CreateProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateProductSchema>>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            price: 0
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof CreateProductSchema>) {

        setError("");
        setSuccess("");

        startTransition(() => {
            CreateAction(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);


                    if (data.error === undefined) {
                        form.reset()
                        router.refresh();
                    }

                    toast.success(data.success)
                    toast.error(data.error)

                }).catch((error) => {
                    console.log(error)
                })
        });
    };

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Crear
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear nuevo producto</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre de producto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Café americano" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Escribe el precio del producto" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea className='max-h-48' placeholder="Escribe el precio del producto" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoría</FormLabel>
                                        <Select onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una categoría" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>

                                                {categories.map((data, index) => (
                                                    <SelectItem key={index} value={data.id}>{data.name}</SelectItem>
                                                ))}


                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className='flex flex-row gap-5'>
                                <DialogClose asChild>
                                    <Button variant={'ghost'} disabled={isPending}>Cerrar</Button>
                                </DialogClose>
                                <Button type='submit' disabled={isPending}>

                                    {isPending ?
                                        <p>Confirmando...</p>
                                        :
                                        <p>Confirmar</p>
                                    }
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>


                </DialogHeader>
            </DialogContent>
        </Dialog>



    )
}

export default CreateProduct