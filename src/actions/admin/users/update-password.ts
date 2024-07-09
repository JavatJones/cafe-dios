"use server";

import { createClient } from '@supabase/supabase-js'

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas/admin/users"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const deleteAction = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, password } = validatedFields.data;

    // Register auth
    try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })
        const { data, error } = await supabase.auth.admin.updateUserById(id, { password: password })

        if (error) {
            return { error: "¡Algo ha salido mal!" }
        }




    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡Contraseña actualizada!" }

}

export default deleteAction