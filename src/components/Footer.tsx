
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">BR</span>
              </div>
              <span className="text-xl font-bold text-white">Bachelor's Recipe</span>
            </Link>
            <p className="text-gray-400">
              Pre-measured ingredient kits and step-by-step instructions for young people learning to cook.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-400 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-orange-500" />
                <a href="mailto:info@bachelorsrecipe.com" className="text-gray-400 hover:text-white transition-colors">
                  info@bachelorsrecipe.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-orange-500" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-orange-500 mt-1" />
                <span className="text-gray-400">
                  123 Kitchen Street, Foodie Town, FT 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="py-2 px-3 bg-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Bachelor's Recipe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
