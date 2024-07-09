"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DeleteStoreSchema } from "@/schemas/admin/stores"
import DeleteAction from '@/actions/admin/stores/delete'

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
import { useTransition } from 'react'
import { toast } from 'react-toastify'

interface props {
    id: string;
}



const DeleteStores = ({ id }: props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof DeleteStoreSchema>>({
        resolver: zodResolver(DeleteStoreSchema),
        defaultValues: {
            id: id,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof DeleteStoreSchema>) {
        setError("");
        setSuccess("");

        startTransition(() => {
            DeleteAction(values)
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
                    Eliminar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar tienda</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">


                            <DialogDescription>
                                Esta acción no se puede deshacer.
                            </DialogDescription>


                            {/* dummy for id*/}
                            <FormField
                                control={form.control}
                                name='id'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='hidden flex-row space-x-4 items-center'>
                                            <FormLabel className='text-md'>
                                                id
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='id' type='text' {...field} disabled></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>


                            <DialogFooter className='flex flex-row gap-5'>
                                <DialogClose asChild>
                                    <Button variant={'ghost'} disabled={isPending}>Cerrar</Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button type='submit' disabled={isPending}>

                                        {isPending ?
                                            <p>Borrando...</p>
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

export default DeleteStores