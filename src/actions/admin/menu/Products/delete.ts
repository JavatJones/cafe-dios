"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { DeleteProductSchema } from "@/schemas/admin/menu"

import { productById } from "@/data/menu";


const DeleteSubCategoryAction = async (values: z.infer<typeof DeleteProductSchema>) => {
    const validatedFields = DeleteProductSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if the user exists
    const existingProduct = await productById(id);

    if (!existingProduct) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete image related
    try {
        const supabase = createClient();
        const existingProduct = await productById(id);

        if (existingProduct.imageUrl !== "no-disponible.png") {
            const { data, error } = await supabase.storage
                .from("Images")
                .remove([existingProduct.imageUrl])

        }

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    // Delete product
    try {
        const supabase = createClient();

        const response = await supabase
            .from('products')
            .delete()
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Producto eliminado!` }
}

export default DeleteSubCategoryAction