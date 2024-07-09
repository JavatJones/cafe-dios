import { getUser } from "@/data/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        redirect('/')
    }

    const { data: data_user, error: error_user } = await supabase
        .from('users')
        .select('*')
        .eq('User_id', data.user.id)
        .single(); // .single() assumes there is only one product per slug


    // if (errors || (datas. != "bbd40f5a-813a-427c-baf6-1508921e3069")) {
    //     redirect('/admin')
    // }

    // if (data_user?.role != "bbd40f5a-813a-427c-baf6-1508921e3069") {
    //     redirect('/admin')
    // }

    return (
        <main className="flex flex-col">
            <main className="pt-10 min-h-screen">
                {children}
            </main>
        </main>
    )
}