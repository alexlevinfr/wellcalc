'use client'
 
import dynamic from 'next/dynamic'
import React from 'react'

const MyForm = dynamic(() => import('../../src/MyForm.js'), { ssr: false })
 
export function ClientOnly() {
  return <MyForm />
}
