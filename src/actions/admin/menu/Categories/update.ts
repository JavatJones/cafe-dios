"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { UpdateCategorySchema } from "@/schemas/admin/menu"
import { categoryByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const UpdateCategoryAction = async (values: z.infer<typeof UpdateCategorySchema>) => {
    const validatedFields = UpdateCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name } = validatedFields.data;

    //Check if the name exists
    const existingCategory = await categoryByName(name)

    if (existingCategory) {
        if (existingCategory.id !== id) {
            return { error: `¡Una categoría con ese nombre ya existe!` }
        };
    };

    // Create Slug
    const slugify = generateSlug(name)

    // Create products-categories-n2
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products-categories-n1')
            .update({ name: name, slug: slugify })
            .eq('id', id)

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Categoría actualizado!` }
}

export default UpdateCategoryAction