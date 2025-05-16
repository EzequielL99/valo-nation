import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-light'>
      <div className="container py-5 text-dark text-center">
        Todos los derechos reservados {new Date().getFullYear()}
      </div>
    </footer>
  )
}
