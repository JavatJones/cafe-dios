"use server";

import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/utils/supabase/server';
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/admin/users"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const deleteAction = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }




    const { id } = validatedFields.data;


    const supabase = createServerClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return { error: "Algo ha salido mal!" }
    }


    if (id === data?.user.id) {
        return { error: "No puedes eliminarte a ti mismo" }
    }


    // delete auth
    try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })
        const { data, error } = await supabase.auth.admin.deleteUser(id)

        if (error) {
            return { error: "¡Algo ha salido mal!" }
        }




    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡Usuario eliminado!" }

}

export default deleteAction