import { Separator } from '@/components/ui/separator'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import UsersGestor from './(components)/users/users-gestor'


const SettingsPage = async () => {
  return (
    <div className='container flex flex-col space-y-5'>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Configuraciones</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Separator></Separator>
      <UsersGestor></UsersGestor>
      <Separator></Separator>
    </div>
  )
}

export default SettingsPage