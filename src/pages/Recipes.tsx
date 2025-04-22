
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const Recipes = () => {
  const { state } = useAppContext();
  const { recipes } = state;
  
  const [searchValue, setSearchValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "North Indian", "South Indian", "Vegetarian", "Quick & Easy"];
  
  // Filter recipes based on search value and category
  useEffect(() => {
    let filtered = recipes;
    
    // Filter by search term
    if (searchValue) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    // Filter by category (in a real app, recipes would have a category field)
    if (selectedCategory !== "All") {
      // This is just a mock filter since our sample data doesn't have categories
      // In a real app, you would filter based on actual category data
      if (selectedCategory === "North Indian") {
        filtered = filtered.filter(recipe => ["1", "2", "4", "6"].includes(recipe.id));
      } else if (selectedCategory === "South Indian") {
        filtered = filtered.filter(recipe => recipe.id === "3");
      } else if (selectedCategory === "Vegetarian") {
        filtered = filtered.filter(recipe => ["1", "2", "3", "5", "6"].includes(recipe.id));
      } else if (selectedCategory === "Quick & Easy") {
        filtered = filtered.filter(recipe => {
          const prepTimeInMinutes = parseInt(recipe.prepTime);
          return prepTimeInMinutes <= 20;
        });
      }
    }
    
    setFilteredRecipes(filtered);
  }, [searchValue, recipes, selectedCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Explore Our Indian Recipes
          </h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white w-full py-3 px-5 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Recipes;
