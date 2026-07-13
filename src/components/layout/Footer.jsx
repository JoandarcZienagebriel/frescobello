import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../constants/site';
import frescologo from '../../assets/img/frescoBello-logo.avif'
export default function Footer() {
  return (
    <footer className="bg-[#010B13] text-alabaster">
      <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 pb-4 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 pb-4">
           
            <p className="text-sm text-alabaster max-w-md leading-relaxed">
              Premium fresh pasta, crafted with precision using professional Italian equipment
              while maintaining the authentic taste and texture of Italian cuisine.
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-gold">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className=''>
            <h4 className="text-xs uppercase tracking-wider text-gold mb-4">Navigate</h4>
            <ul className="text-xs text-alabaster space-y-2">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Shop</Link></li>
              <li><Link to="/our-method" className="hover:text-gold transition-colors">Our Method</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className=''>
            <h4 className="text-xs uppercase tracking-wider text-gold mb-4">Contact</h4>
            <ul className="space-y-2 text-xs text-alabaster">
              <li>{SITE_CONFIG.contact.location}</li>
              <li>{SITE_CONFIG.contact.manager}</li>
              <li>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold transition-colors break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex items-center justify-start'>
           <img
              src= {frescologo}
              alt="FrescoBello"
              className="h-[10rem] md:h-[20rem] w-auto"
            />
            <span className='text-2xl md:text-[4rem] lg:text-[7rem] text-red-700' >Fresco</span><span className=' text-2xl md:text-[4rem] lg:text-[7rem] text-gold'>Bello</span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <p className="text-xs text-alabaster/50">
            {new Date().getFullYear()} FrescoBello. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-xs text-alabaster/50 hover:text-gold transition-colors">About</Link>
            <Link to="/contact" className="text-xs text-alabaster/50 hover:text-gold transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  )}