import { Link } from 'react-router-dom'
import { footerContent } from '../book/shared-footer-book'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div data-footer="">
      <footer className="footer">
        <div className="container">
          <div className="footer-grid footer-grid-updated">
            <div className="footer-brand">
              <img src={footerContent.logoSrc} alt={footerContent.logoAlt} />
              <p>{footerContent.blurb}</p>
            </div>
            <div>
              <h4>{footerContent.exploreTitle}</h4>
              <div className="footer-links">
                {footerContent.links.map((link) => (
                  <Link key={link.to} to={link.to}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4>{footerContent.contactTitle}</h4>
              <div className="footer-links">
                <a href={`mailto:${footerContent.email}`}>{footerContent.email}</a>
                {footerContent.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {year} PLG Solutions. All rights reserved.</span>
            <span>{footerContent.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
