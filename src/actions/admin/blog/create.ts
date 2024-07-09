"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { CreatePostSchema } from "@/schemas/admin/blog"

import { postById, postByTitle } from "@/data/blog";
import { generateSlug } from "@/lib/slugify";


const CreateBlogAction = async (values: z.infer<typeof CreatePostSchema>) => {
    const validatedFields = CreatePostSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { title, content } = validatedFields.data;


    //Check if the title exists
    const existingByTitle = await postByTitle(title)

    if (existingByTitle) {
        return { error: `¡Un post con ese titulo ya existe!` }
    };

    // Create Slug
    const slugify = generateSlug(title)


    // Delete posts
    try {
        const supabase = createClient();
        const response = await supabase
            .from('posts')
            .insert({ title, content, slug: slugify, imageUrl: "no-disponible.png" })

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Post actualizado!` }
}

export default CreateBlogAction