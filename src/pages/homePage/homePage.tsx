import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <Link to={'/signin_page'}>go to signin page</Link>
  )
}
