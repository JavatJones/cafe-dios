import { createClient } from "@/utils/supabase/server";

//get all posts
export const getAllAnnouncements = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('announcements')
        .select('*')
    if (error) {
        console.error('Error fetching product:', error);
        return [];
    }

    return data;
};

//get all posts
export const getAllAnnouncementsByOrder = async () => {

    const supabase = createClient();


    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('order', { ascending: true })
    if (error) {
        console.error('Error fetching product:', error);
        return [];
    }

    return data;
};
