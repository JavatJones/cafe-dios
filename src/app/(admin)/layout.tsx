import NavbarSelector from "./(components)/navbar/navbar-selector"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
export default async function AdminLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        redirect('/signin')
    }

    return (
        <main className="flex flex-col">
            {/* navbar */}
            {/* toastfy */}
            <NavbarSelector></NavbarSelector>
            <main className="pt-10 min-h-screen">
                {children}
            </main>
            <ToastContainer theme="colored" position="bottom-right" />

        </main>
    )
}