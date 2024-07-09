"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { CreateProductSchema } from "@/schemas/admin/menu"
import { productByName } from "@/data/menu";
import { generateSlug } from "@/lib/slugify";

const CreateSubCategoryAction = async (values: z.infer<typeof CreateProductSchema>) => {
    const validatedFields = CreateProductSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, price, description, category_id } = validatedFields.data;

    //Check if the name exists
    const existing = await productByName(name)

    if (existing) {
        return { error: "¡Un producto con ese nombre ya existe!" }
    }

    // Create Slug
    const slugify = generateSlug(name)

    // Create products
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('products')
            .insert({ name: name, price: price, description: description, category_id: category_id, slug: slugify });

        if (error) {
            return { error: 'Error en la base de datos: No se ha podido crear la categoría.' }
        };


    } catch (e) {
        return { error: 'Error en la base de datos: No se ha podido crear la categoría.' };
    }

    return { success: `¡Producto creado!` }
}

export default CreateSubCategoryAction