"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { UpdatePostSchema } from "@/schemas/admin/blog"

import { postById, postByTitle } from "@/data/blog";
import { generateSlug } from "@/lib/slugify";


const UpdateBlogAction = async (values: z.infer<typeof UpdatePostSchema>) => {
    const validatedFields = UpdatePostSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, title, content, videoUrl } = validatedFields.data;

    //Check if the user exists
    const existing = await postById(id);

    if (!existing) {
        return { error: "¡Algo ha salido mal!" }
    }


    //Check if the name exists
    const existingByTitle = await postByTitle(title)

    if (existingByTitle) {
        if (existingByTitle.id !== id) {
            return { error: `¡Un post con ese titulo ya existe!` }
        };
    };

    // Create Slug
    const slugify = generateSlug(title)


    // Delete posts
    try {
        const supabase = createClient();
        const response = await supabase
            .from('posts')
            .update({ title, videoUrl, content, slug: slugify })
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Post actualizado!` }
}

export default UpdateBlogAction