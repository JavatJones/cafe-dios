
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlOptionsVertical } from "react-icons/sl";

import { createClient } from "@/utils/supabase/server";
import { getUser } from '@/data/user';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth/logout';


const NavbarExtra = async () => {

  const supabase = createClient();


  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    return null
  }


  const userData = await getUser(data.user?.id!)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SlOptionsVertical></SlOptionsVertical>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='truncate max-w-48'>
          {userData?.name || ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <form action={logout}>
            <Button className='w-full' type='submit'>
              Cerrar sesión
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default NavbarExtra