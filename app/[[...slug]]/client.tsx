'use client'
 
import dynamic from 'next/dynamic'
 
const MyForm = dynamic(() => import('../../src/MyForm.js'), { ssr: false })
 
export function ClientOnly() {
  return <MyForm />
}
