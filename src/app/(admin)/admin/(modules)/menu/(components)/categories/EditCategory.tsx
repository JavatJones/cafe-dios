"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UpdateCategorySchema } from "@/schemas/admin/menu"
import UpdateCategoryAction from '@/actions/admin/menu/Categories/update'

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

interface EditSCProps {
    id: string;
    name: string;
   
}



const EditCategory = ({ id, name }: EditSCProps) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    // 1. Define your form.
    const form = useForm<z.infer<typeof UpdateCategorySchema>>({
        resolver: zodResolver(UpdateCategorySchema),
        defaultValues: {
            id: id,
            name: name,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof UpdateCategorySchema>) {
        setError("");
        setSuccess("");

        startTransition(() => {
            UpdateCategoryAction(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);


                    if (data.error === undefined) {
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
                <Button variant={'ghost'} className='w-full'>
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar categoría</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre de categoría</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Café caliente" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className='flex flex-row gap-5'>
                                <DialogClose asChild>
                                    <Button variant={'ghost'} disabled={isPending}>Cerrar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type='submit' disabled={isPending}>

                                        {isPending ?
                                            <p>Confirmando...</p>
                                            :
                                            <p>Confirmar</p>
                                        }
                                    </Button>
                                </DialogClose>
                            </DialogFooter>

                        </form>
                    </Form>


                </DialogHeader>
            </DialogContent>
        </Dialog>



    )
}

export default EditCategory