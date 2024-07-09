"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { DeleteSubCategorySchema } from "@/schemas/admin/menu"

import { subcategoryById } from "@/data/menu";


const DeleteSubCategoryAction = async (values: z.infer<typeof DeleteSubCategorySchema>) => {
    const validatedFields = DeleteSubCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if the user exists
    const existingSubCategory = await subcategoryById(id);

    if (!existingSubCategory) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete image related
    try {
        const supabase = createClient();
        const existingSubCategory = await subcategoryById(id);

        if (existingSubCategory.imageUrl !== "no-disponible.png") {
            const { data, error } = await supabase.storage
                .from("Images")
                .remove([existingSubCategory.imageUrl])

        }

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete products-categories-n2
    try {
        const supabase = createClient();

        const response = await supabase
            .from('products-categories-n2')
            .delete()
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Sub categoría eliminada!` }
}

export default DeleteSubCategoryAction