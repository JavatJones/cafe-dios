"use server";

import { createClient } from '@supabase/supabase-js'

import * as z from "zod";
import { CreateUserSchema } from "@/schemas/admin/users"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const register = async (values: z.infer<typeof CreateUserSchema>) => {
    const validatedFields = CreateUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, email, password, role } = validatedFields.data;



    // const supabase = createClient();

    // const { data: users, error: fetchError } = await supabase.auth.admin.listUsers();

    // if (users) {
    //     return { error: "¡Algo ha salido mal!!!!" }
    //     // redirect('/')
    // }




    // Register auth
    try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })



        const { data, error } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true // Marcar el correo como verificado

        })

        if (error) {

            return { error: `¡Algo ha salido mal!! ${error.message}`, }
            // redirect('/')
        }


        if (data) {
            const userID = data.user?.id
            const result = await supabase
                .from('users')
                .insert({ name, role, User_id: userID });

            if (result.error) {
                return { error: "¡Algo ha salido mal!!!" }

            }

        }


    } catch (error) {
        return { error: "¡Algo ha salido mal!?" }
    }

    return { success: "¡Usuario creado!" }

}

export default register