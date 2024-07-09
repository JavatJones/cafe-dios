"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { byIdSchema } from "@/schemas/index"

import { postById } from "@/data/blog";


const DeleteBlogAction = async (values: z.infer<typeof byIdSchema>) => {
    const validatedFields = byIdSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if the user exists
    const existing = await postById(id);

    if (!existing) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete posts
    try {
        const supabase = createClient();
        const response = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Eliminado!` }
}

export default DeleteBlogAction