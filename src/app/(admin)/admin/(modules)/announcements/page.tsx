import React from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import GestorAnnouncements from './(components)/gestor-announcements'
import { getAllAnnouncementsByOrder } from '@/data/announcements'

const announcementsPage = async () => {

    const announcements = await getAllAnnouncementsByOrder()


    return (
        <div className='container flex flex-col space-y-5 py-10'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Anuncios</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <GestorAnnouncements Announcements={announcements}></GestorAnnouncements>

        </div>
    )
}

export default announcementsPage