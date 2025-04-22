
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Recipe } from "@/contexts/AppContext";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 h-full"
    >
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative h-48 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              {recipe.prepTime} + {recipe.cookTime}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {recipe.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-orange-500">₹{recipe.price.toFixed(2)}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              View More
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
