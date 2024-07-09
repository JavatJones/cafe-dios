"use server";

import { createClient } from "@/utils/supabase/server";

import * as z from "zod";
import { EditStoreSchema } from "@/schemas/admin/stores"

const Update = async (values: z.infer<typeof EditStoreSchema>) => {
    const validatedFields = EditStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, address, url } = validatedFields.data;

    // edit stores
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('stores')
            .update({ name, address, url })
            .eq('id', id)

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡Tienda actualizada!` }
}

export default Update