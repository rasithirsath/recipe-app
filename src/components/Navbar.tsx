import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would filter recipes here
    console.log("Search for:", searchValue);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="h-20 w-20 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">
              <img src="https://i.postimg.cc/gk7J0Kfg/logo.jpg" alt="logo" />
            </span>
          </motion.div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Bachelor's Recipe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="py-2 px-4 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 transition-all duration-200 focus:w-64 text-gray-800 dark:text-gray-200"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </form>

          {/* Navigation Links */}
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
          >
            Recipes
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
          >
            About Us
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
            aria-label="Toggle Dark Mode"
          >
            {state.darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-orange-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold"
              >
                {cartItemCount}
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link
            to="/cart"
            className="relative text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
            aria-label="Open Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 shadow-inner"
        >
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-gray-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 flex items-center"
              >
                {state.darkMode ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
