import React from 'react'

//productos
import { getAllUser, getAllRoles, getRolesById } from "@/data/user"
import { DataTable } from './data-table'
import { schema, columns } from "./columns"
import { createClient } from '@/utils/supabase/server'



interface rolesSchema {
  id: string;
  name: string;
}
async function getDataRolesByID(id: string): Promise<rolesSchema[]> {
  // Fetch data from your API here.
  const info = await getRolesById(id)

  if (!info) {
    // Manejar el caso en que loads sea null
    console.error('Error: No se pudo obtener la carga');
    return [];
  }


  return info.map((dt: rolesSchema) => ({
    id: dt.id,
    name: dt.name,

  }));
}


async function getDataUsers(): Promise<schema[]> {
  // Fetch data from your API here.
  const info = await getAllUser();
  const roles = await getAllRoles()

  if (!info || !roles) {
    // Manejar el caso en que loads sea null
    console.error('Error: No se pudo obtener la carga');
    return [];
  }


  return info.map((dt: schema) => (
    {
      id: dt.id,
      name: dt.name,
      role: dt.role,
      User_id: dt.User_id,
      roles: roles,

    }));
}



async function getDataRoles(): Promise<rolesSchema[]> {
  // Fetch data from your API here.
  const info = await getAllRoles()

  if (!info) {
    // Manejar el caso en que loads sea null
    console.error('Error: No se pudo obtener la carga');
    return [];
  }


  return info.map((dt: rolesSchema) => ({
    id: dt.id,
    name: dt.name,

  }));
}



const UsersGestor = async () => {

  const users = await getDataUsers()
  const roles = await getDataRoles()

  return (
    <div className='flex flex-col'>


      {/* tabla con todos los productos */}

      <DataTable roles={roles} data={users} columns={columns} ></DataTable>

    </div>
  )
}

export default UsersGestor