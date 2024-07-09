import { createClient } from "@/utils/supabase/server";


//get getUserbyid
export const getUser = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('User_id', id)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//get getUserbyid
export const getUserAuthByID = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase.auth.getUser(id);
    
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//get all users
export const getAllUser = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('users')
        .select('*')

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//get all roles
export const getAllRoles = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('roles')
        .select('*')

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

//get all roles
export const getRolesById = async (id: string) => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('id', id)
        .single(); // .single() assumes there is only one product per slug

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data;
};

