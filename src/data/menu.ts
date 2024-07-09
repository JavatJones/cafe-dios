import { createClient } from "@/utils/supabase/server";

//categories
//find all categories N1
export const allCategoriesN1 = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products-categories-n1')
        .select('*')


    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find a product by his slug filtered by his categories
export const AllProductsByCategory = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', id)
        .order('name', { ascending: true })
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find a subcategory by name
export const categoryByName = async (name: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('products-categories-n1')
        .select('*')
        .eq('name', name)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find a subcategory by his id
export const categoryById = async (id: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('products-categories-n1')
        .select('*')
        .eq('id', id)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};


//sub categories

//find a subcategory by name
export const subcategoryByName = async (name: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('products-categories-n2')
        .select('*')
        .eq('name', name)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};


//find a subcategory by his slug filtered by his categories
export const subcategoryBySlug = async (slug: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('products-categories-n2')
        .select('*')
        .eq('slug', slug)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};



//find a subcategory by his id
export const subcategoryById = async (id: string) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('products-categories-n2')
        .select('*')
        .eq('id', id)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};


//find all categories N2
export const allCategoriesN2 = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products-categories-n2')
        .select('*')


    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find all categories N2 by id
export const allCategoriesN2ById = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products-categories-n2')
        .select('*')
        .eq('category_id', id)
        .order('name', { ascending: true })
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//products

//Find all products
export const allProducts = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order("created_at", { ascending: false })
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find a product by his slug filtered by his categories
export const productByName = async (name: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('name', name)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};


//find a product by his slug filtered by his categories
export const productBySlug = async (slug: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//find a product by his slug filtered by his categories
export const productById = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};
