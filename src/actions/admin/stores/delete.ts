"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { DeleteStoreSchema } from "@/schemas/admin/stores"

import { storesById } from "@/data/stores";


const Delete = async (values: z.infer<typeof DeleteStoreSchema>) => {
    const validatedFields = DeleteStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if exists
    const existing = await storesById(id);

    if (!existing) {
        return { error: "¡Algo ha salido mal!" }
    }

    // stores Delete
    try {
        const supabase = createClient();
        const response = await supabase
            .from('stores')
            .delete()
            .eq('id', id)
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Tienda eliminada!` }
}

export default Delete