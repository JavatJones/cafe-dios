"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { CreateStoreSchema } from "@/schemas/admin/stores"

const Create = async (values: z.infer<typeof CreateStoreSchema>) => {
    const validatedFields = CreateStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, address, url } = validatedFields.data;

    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('stores')
            .insert({ name, address, url });


        if (error) {
            return { error: 'Error en la base de datos' };
        };

    } catch (e) {
        return { error: 'Error en la base de datos' };
    }



    return { success: `¡Tienda creada!` };
}

export default Create