'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { id } =  useParams<{ id: string }>();


  return (
    <div>
        Site Page
        <p>Site ID: {id}</p>
    </div>
  )
}

export default page
