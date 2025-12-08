import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
 title: 'Wellable-style Calculator',
 description: 'Wellable-style calculator built on next.',
 manifest: 'manifest.json'
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

import './style.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
  <body>
    <div id="root">{children}</div>
  </body>
</html>

  ) 


}
