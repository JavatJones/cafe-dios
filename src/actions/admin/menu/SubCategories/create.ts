"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { CreateSubCategorySchema } from "@/schemas/admin/menu"
import { subcategoryByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const CreateSubCategoryAction = async (values: z.infer<typeof CreateSubCategorySchema>) => {
    const validatedFields = CreateSubCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, category_id } = validatedFields.data;

    //Check if the name exists
    const existing = await subcategoryByName(name)

    if (existing) {
        return { error: "¡Una categoría con ese nombre ya existe!" }
    }

    // Create Slug
    const slugify = generateSlug(name)

    // Create products-categories-n2
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products-categories-n2')
            .insert({ name: name, category_id: category_id, slug: slugify, imageUrl: "no-disponible.png" });

        if (error) {
            return { error: 'Error en la base de datos: No se ha podido crear la categoría.' }
        };


    } catch (e) {
        return { error: 'Error en la base de datos: No se ha podido crear la categoría.' };
    }

    return { success: `¡Exito! ${slugify}` }
}

export default CreateSubCategoryAction