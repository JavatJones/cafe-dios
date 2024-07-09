import React from 'react'

import Modules from './(components)/modules'
import { createClient } from '@/utils/supabase/server';

const AdminPage = async () => {

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    return null
  }

  const { data: data_user, error: error_user } = await supabase
    .from('users')
    .select('*')
    .eq('User_id', data.user.id)
    .single(); // .single() assumes there is only one product per slug



  return (
    <div className='container pt-10 flex flex-col space-y-20'>

      <h1 className='font-bold text-2xl truncate'>Bienvenido! {data_user?.name || ""}</h1>
      {/* modules */}
      <Modules></Modules>
    </div>
  )
}

export default AdminPage