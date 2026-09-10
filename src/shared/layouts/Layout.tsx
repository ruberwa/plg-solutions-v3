import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { usePlgEffects, useScrollToHash } from '../hooks/usePlgEffects'

const Layout = () => {
  usePlgEffects()
  useScrollToHash()

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
