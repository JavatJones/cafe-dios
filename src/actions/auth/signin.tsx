"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { signin } from "@/schemas/auth"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const SignIn = async (values: z.infer<typeof signin>) => {
    const validatedFields = signin.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;





    // Login auth
    try {
        const supabase = createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            return { error: "¡Algo ha salido mal!" }
            // redirect('/')
        }



    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    redirect('/admin')
    return { success: "¡Bienvenido!" }

}

export default SignIn