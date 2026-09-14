import { createBrowserRouter } from 'react-router-dom'
import Layout from '../shared/layouts/Layout'
import Home from '../modules/landing/pages/Home'
import Capabilities from '../modules/capabilities/pages/Capabilities'
import Industries from '../modules/industries/pages/Industries'
import About from '../modules/about/pages/About'
import Contact from '../modules/contact/pages/Contact'
import Privacy from '../modules/legal/pages/Privacy'
import Terms from '../modules/legal/pages/Terms'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/capabilities', element: <Capabilities /> },
      { path: '/industries', element: <Industries /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
    ],
  },
])

export default router
