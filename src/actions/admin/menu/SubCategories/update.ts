"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { UpdateSubCategorySchema } from "@/schemas/admin/menu"
import { subcategoryById, subcategoryByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const UpdateSubCategoryAction = async (values: z.infer<typeof UpdateSubCategorySchema>) => {
    const validatedFields = UpdateSubCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, category_id } = validatedFields.data;

    //Check if the name exists
    const existingSubCategory = await subcategoryByName(name)

    if (existingSubCategory) {
        if (existingSubCategory.id !== id) {
            return { error: `¡Una categoría con ese nombre ya existe!` }
        };
    };

    // Create Slug
    const slugify = generateSlug(name)
    
    // Create products-categories-n2
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products-categories-n2')
            .update({ name: name, slug: slugify, category_id: category_id })
            .eq('id', id)

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Sub categoría actualizado!` }
}

export default UpdateSubCategoryAction