import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
   <section className="flex items-center justify-center lg:min-h-[40vh]">
    <SignIn/>
   </section>
  )
}

export default page