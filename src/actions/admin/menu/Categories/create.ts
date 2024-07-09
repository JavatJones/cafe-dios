"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { CreateCategorySchema } from "@/schemas/admin/menu"
import { categoryByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const CreateSubCategoryAction = async (values: z.infer<typeof CreateCategorySchema>) => {
    const validatedFields = CreateCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name } = validatedFields.data;

    //Check if the name exists
    const existing = await categoryByName(name)

    if (existing) {
        return { error: "¡Una categoría con ese nombre ya existe!" }
    }

    // Create Slug
    const slugify = generateSlug(name)
    // Create products-categories-n1

    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products-categories-n1')
            .insert({ name: name, slug: slugify });


        if (error) {
            return { error: 'Error en la base de datos: No se ha podido crear la categoría.' }
        };

    } catch (e) {
        return { error: 'Error en la base de datos: No se ha podido crear la categoría.' };
    }



    return { success: `¡Categoría creada!` };
}

export default CreateSubCategoryAction