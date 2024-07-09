"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { UpdateProductSchema } from "@/schemas/admin/menu"
import { productByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const UpdateProductAction = async (values: z.infer<typeof UpdateProductSchema>) => {
    const validatedFields = UpdateProductSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, price, description, category_id } = validatedFields.data;

    //Check if the name exists
    const existing = await productByName(name)

    if (existing) {
        if (existing.id !== id) {
            return { error: `¡Un producto con ese nombre ya existe!` }
        };
    };


    // Create Slug
    const slugify = generateSlug(name)

    // Create products
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products')
            .update({ name: name, price: price, description: description, category_id: category_id, slug: slugify })
            .eq('id', id)

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Producto actualizado!` }
}

export default UpdateProductAction