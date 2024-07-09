"use server";

import { createClient } from "@/utils/supabase/server";
import * as z from "zod";
import { UpdateUserSchema } from "@/schemas/admin/users"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const updateUserAction = async (values: z.infer<typeof UpdateUserSchema>) => {
    const validatedFields = UpdateUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, User_id, name, role } = validatedFields.data;

    // Register auth
    try {
        const supabase = createClient()


        const { data, error } = await supabase
            .from('users')
            .update({ name, role })
            .eq('id', id)


        if (error) {
            return { error: "¡Algo ha salido mal!" }
        }




    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡Usuario actualizada!" }

}

export default updateUserAction