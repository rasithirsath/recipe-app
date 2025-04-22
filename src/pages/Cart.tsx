
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, ChevronLeft } from "lucide-react";

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  
  const { cart } = state;
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.recipe.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        message: 'Item removed from cart',
        type: 'info'
      }
    });
  };
  
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/payment');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Cart
          </h1>
          <Link 
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 inline-flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-6">
              <ShoppingCart className="h-20 w-20 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Looks like you haven't added any recipe kits to your cart yet.
            </p>
            <Link 
              to="/"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block"
            >
              Browse Recipes
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.recipe.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center ${
                        index > 0 ? "border-t border-gray-200 dark:border-gray-700 pt-6 mt-6" : ""
                      }`}
                    >
                      <img
                        src={item.recipe.image}
                        alt={item.recipe.name}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.recipe.name}
                        </h3>
                        
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {item.recipe.prepTime} + {item.recipe.cookTime}
                        </p>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => handleUpdateQuantity(item.recipe.id, item.quantity - 1)}
                          className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="mx-3 w-6 text-center font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(item.recipe.id, item.quantity + 1)}
                          className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="ml-6 text-right">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          ${(item.recipe.price * item.quantity).toFixed(2)}
                        </p>
                        
                        <button
                          onClick={() => handleRemoveItem(item.recipe.id)}
                          className="text-red-500 hover:text-red-600 flex items-center mt-1"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-xs">Remove</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Proceed to Payment
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
