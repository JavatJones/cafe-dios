"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signin } from "@/schemas/auth"
import SignInAuthComponent from '@/actions/auth/signin'

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
import { Textarea } from '@/components/ui/textarea';


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const SignInComponent = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof signin>>({
        resolver: zodResolver(signin),
        defaultValues: {

        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof signin>) {

        setError("");
        setSuccess("");

        startTransition(() => {
            SignInAuthComponent(values)
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
        <div className='flex flex-col justify-center items-center w-full gap-3'>
            <Card className='flex flex-col w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='font-bold text-center text-3xl capitalize'>Cafetería desde que dios amanece</CardTitle>
                    <CardDescription className='text-center'>¡Bienvenido de vuelta!</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-5'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <Button className='w-full' type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Entrando...</p>
                                    :
                                    <p>Entrar</p>
                                }
                            </Button>

                        </form>
                    </Form>


                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignInComponent