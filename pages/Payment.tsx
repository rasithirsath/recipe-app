
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Check, CreditCard, ChevronLeft } from "lucide-react";
import emailjs from "emailjs-com";

interface FormFields {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const Payment = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  const { cart } = state;
  const subtotal = cart.reduce((total, item) => total + item.recipe.price * item.quantity, 0);
  const shipping = 40;
  const total = subtotal + shipping;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      processedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    // Clear error when the field is updated
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    
    // Validate card number
    const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/;
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Valid 16-digit card number is required";
    }
    
    // Validate expiry date
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format must be MM/YY";
    }
    
    // Validate CVV
    const cvvRegex = /^\d{3}$/;
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "Valid 3-digit CVV is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Send email to admin
      const orderDetails = {
        userName: formData.name,
        userEmail: formData.email,
        orderItems: cart.map(item => `${item.recipe.name} (${item.quantity})`).join(", "),
        totalAmount: `₹${total.toFixed(2)}`,
        toEmail: "bachelorsrecipe.admin@example.com"
      };
      
      // Simulate payment and email processing with a delay
      setTimeout(() => {
        // In a real app, you would use EmailJS or a backend service to send emails
        // For this demo, we'll just simulate success
        console.log("Order details:", orderDetails);
        
        // Clear cart and redirect to confirmation page
        dispatch({ type: 'CLEAR_CART' });
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            message: 'Payment successful! Thank you for your order.',
            type: 'success'
          }
        });
        
        navigate('/confirmation');
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 && !isProcessing ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate("/")}
              className="text-orange-500 hover:underline flex items-center justify-center mx-auto"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Return to shopping
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Payment
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
                    Payment Information
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            submitAttempted && errors.name 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          placeholder="John Doe"
                        />
                        {submitAttempted && errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            submitAttempted && errors.email 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          placeholder="john.doe@example.com"
                        />
                        {submitAttempted && errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19} // 16 digits + 3 spaces
                          className={`w-full px-4 py-3 rounded-lg border ${
                            submitAttempted && errors.cardNumber 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {submitAttempted && errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            maxLength={5} // MM/YY
                            className={`w-full px-4 py-3 rounded-lg border ${
                              submitAttempted && errors.expiryDate 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                            placeholder="MM/YY"
                          />
                          {submitAttempted && errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-gray-700 dark:text-gray-300 mb-1">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="password"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength={3}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              submitAttempted && errors.cvv 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                            placeholder="123"
                          />
                          {submitAttempted && errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isProcessing}
                          type="submit"
                          className={`w-full bg-orange-500 text-white py-4 rounded-lg font-medium ${
                            isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'
                          } transition-colors flex items-center justify-center`}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Payment...
                            </>
                          ) : (
                            'Complete Payment'
                          )}
                        </motion.button>
                      </div>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Your payment information is secure. We don't store your card details.
                      </p>
                    </div>
                  </form>
                </motion.div>
              </div>
              
              {/* Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.recipe.id} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.recipe.name} <span className="text-gray-400">x{item.quantity}</span>
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          ₹{(item.recipe.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-900 dark:text-white font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping Fee</span>
                      <span className="text-gray-900 dark:text-white font-medium">₹{shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-orange-500">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700 dark:text-green-400">
                            Your order will be delivered within 2-3 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Payment;
