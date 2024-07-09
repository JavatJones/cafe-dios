"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ResetPasswordSchema } from "@/schemas/admin/users"
import ActionUpdatePassword from '@/actions/admin/users/update-password'

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

interface Props {
    id: string;

}



const UpdatePassword = ({ id }: Props) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            id: id,
            password: "",
            passwordConfirm: ""
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {

        setError("");
        setSuccess("");

        startTransition(() => {
            ActionUpdatePassword(values)
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
                <Button variant={'ghost'} className='w-full'>
                    Cambiar contraseña
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cambiar contraseña de usuario</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">


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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} disabled={isPending} />
                                        </FormControl>
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

export default UpdatePassword