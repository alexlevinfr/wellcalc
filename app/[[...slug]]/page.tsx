import { ClientOnly } from './client'
import React from 'react'
export function generateStaticParams() {
  return [{ slug: [''] }]
}
 
export default function Page() {
  return <ClientOnly />
}

