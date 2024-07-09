import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';



const modules = async () => {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        return null
    }

    const { data: data_user, error: error_user } = await supabase
        .from('users')
        .select('*')
        .eq('User_id', data.user.id)
        .single(); // .single() assumes there is only one product per slug



    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            <Link href={"/admin/menu"}>
                <Card>
                    <div className='block flex-col items-center justify-center h-full w-full p-10 space-y-5'>
                        <p className='truncate text-center'>Gestionar Menú</p>
                    </div>
                </Card>
            </Link>

            <Link href={"/admin/announcements"}>
                <Card>
                    <div className='block flex-col items-center justify-center h-full w-full p-10 space-y-5'>
                        <p className='truncate text-center'>Anuncios</p>
                    </div>
                </Card>
            </Link>

            <Link href={"/admin/stores"}>
                <Card>
                    <div className='block flex-col items-center justify-center h-full w-full p-10 space-y-5'>
                        <p className='truncate text-center'>Gestionar Sucursales</p>
                    </div>
                </Card>
            </Link>

            <Link href={"/admin/blog"}>
                <Card>
                    <div className='block flex-col items-center justify-center h-full w-full p-10 space-y-5'>
                        <p className='truncate text-center'>Gestionar Blog</p>
                    </div>
                </Card>
            </Link>
            {(data_user?.role != "bbd40f5a-813a-427c-baf6-1508921e3069") ? null :
                <Link href={"/admin/settings"}>
                    <Card>
                        <div className='block flex-col items-center justify-center h-full w-full p-10 space-y-5'>
                            <p className='truncate text-center'>Configuraciones</p>
                        </div>
                    </Card>
                </Link>
            }

        </div>
    )
}

export default modules