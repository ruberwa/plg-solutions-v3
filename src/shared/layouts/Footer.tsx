import { footerContent } from '../..'

const Footer = () => {
  return (
    <footer className="bg-primaryDark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-secondary">{footerContent.company.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footerContent.company.description}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {footerContent.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer