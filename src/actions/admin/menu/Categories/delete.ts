"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { DeleteCategorySchema } from "@/schemas/admin/menu"

import { categoryById } from "@/data/menu";


const DeleteSubCategoryAction = async (values: z.infer<typeof DeleteCategorySchema>) => {
    const validatedFields = DeleteCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if the user exists
    const existingCategory = await categoryById(id);

    if (!existingCategory) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete products-categories-n2
    try {
        const supabase = createClient();
        const response = await supabase
            .from('products-categories-n1')
            .delete()
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Exito! ${id}` }
}

export default DeleteSubCategoryAction