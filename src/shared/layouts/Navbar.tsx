import { Link } from 'react-router-dom'
import { navbarContent } from '../..'

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-amazon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white hover:text-secondary transition-colors">
              {navbarContent.logo}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-secondary text-sm font-medium transition-colors"
            >
              {navbarContent.navigation.home}
            </Link>
            <a
              href="#features"
              className="text-white hover:text-secondary text-sm font-medium transition-colors"
            >
              {navbarContent.navigation.features}
            </a>
            <a
              href="#about"
              className="text-white hover:text-secondary text-sm font-medium transition-colors"
            >
              {navbarContent.navigation.about}
            </a>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-secondary focus:outline-none focus:text-secondary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primaryDark">
          <Link 
            to="/" 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            {navbarContent.navigation.home}
          </Link>
          <a 
            href="#features" 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            {navbarContent.navigation.features}
          </a>
          <a 
            href="#about" 
            className="text-white hover:text-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            {navbarContent.navigation.about}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
