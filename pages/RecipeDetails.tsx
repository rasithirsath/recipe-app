import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  Utensils,
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
} from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const recipe = state.recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Recipe not found</h2>
          <Link to="/" className="text-orange-500 hover:underline">
            Return to home page
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: recipe });
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        message: `${recipe.name} added to cart!`,
        type: "success",
      },
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to recipes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-72 md:h-96 lg:h-full rounded-2xl overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 h-10 w-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </motion.div>

          {/* Recipe Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {recipe.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {recipe.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-200">
                  Prep: {recipe.prepTime}
                </span>
              </div>
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-200">
                  Cook: {recipe.cookTime}
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-200">
                  Serves: 1
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{recipe.price.toFixed(2)}
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">
                  per kit
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-5 py-3 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </motion.button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Nutrition Information
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(recipe.nutrition).map(([key, value], index) => (
                  <div
                    key={key}
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center"
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">
                      {key}
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {key === "calories" ? value : `${value}g`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                >
                  <div className="h-2 w-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-200">
                    {ingredient}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Instructions
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="relative pl-10"
                >
                  <span className="absolute left-0 top-0 flex items-center justify-center h-7 w-7 rounded-full bg-orange-500 text-white font-medium text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200">
                    {instruction}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetails;
