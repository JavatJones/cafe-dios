import React from 'react'

import StoryAbout from './(components)/story'

// Dynamic metadata
export async function generateMetadata() {
  return {
    title: "Sobre Nosotros",
  }
}

const AboutPage = async () => {
  return (
    <div className='container flex flex-col gap-32 pt-10'>
      <div className='flex flex-col space-y-2'>
        <h2 className='font-light text-xl capitalize tracking-widest'>
          Sobre Nosotros
        </h2>
        <h1 className='font-bold text-4xl capitalize tracking-tight'>
          cafetería desde que dios amanece
        </h1>
      </div>

      <StoryAbout></StoryAbout>

    </div>
  )
}

export default AboutPage