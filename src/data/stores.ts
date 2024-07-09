import { createClient } from "@/utils/supabase/server";

export const allStores = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

export const storesById = async (id: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq("id", id)
        .single()
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};