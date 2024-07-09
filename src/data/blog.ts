import { createClient } from "@/utils/supabase/server";


//get all posts
export const getAllPosts = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order("created_at", { ascending: false })
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//by title
export const postByTitle = async (title: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('title', title)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//by slug
export const postBySlug = async (slug: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//by id
export const postById = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single(); // .single() assumes there is only one product per id

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};