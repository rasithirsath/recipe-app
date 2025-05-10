
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const Confirmation = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  
  // If user navigates directly to this page without payment, redirect to home
  useEffect(() => {
    // In a real app, you'd check for a valid order ID or payment status
    // This is a simple simulation for demo purposes
    const hasCompletedPayment = localStorage.getItem("hasCompletedPayment");
    
    if (!hasCompletedPayment) {
      localStorage.setItem("hasCompletedPayment", "true");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            Thank you for your order. We've sent a confirmation email with all the details.
            Your recipe kit will be delivered within 2-3 business days.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What happens next?
            </h2>
            
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mr-3 mt-0.5">
                  1
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll prepare your recipe kit with pre-measured fresh ingredients
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mr-3 mt-0.5">
                  2
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Your order will be delivered in eco-friendly packaging to keep ingredients fresh
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mr-3 mt-0.5">
                  3
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Follow the included step-by-step recipe card to cook your delicious meal!
                </p>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
            
            <Link
              to="/recipes"
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Browse More Recipes
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Confirmation;
