import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import SplashScreen from "@/components/SplashScreen";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Search } from "lucide-react";

const Index = () => {
  const { state } = useAppContext();
  const { recipes } = state;
  const [searchValue, setSearchValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

  useEffect(() => {
    // Check if user has visited before using localStorage
    const visited = localStorage.getItem("visitedBefore");
    if (visited) {
      setShowSplash(false);
      setHasVisitedBefore(true);
    } else {
      localStorage.setItem("visitedBefore", "true");
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      setFilteredRecipes(
        recipes.filter(
          (recipe) =>
            recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchValue, recipes]);

  if (showSplash && !hasVisitedBefore) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
                alt="Indian Cooking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative py-24 px-8 md:px-16 lg:px-24 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Authentic Indian Cooking{" "}
                <span className="text-orange-500">Made Simple And Healthy</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-white mb-8 max-w-2xl mx-auto"
              >
                Pre-measured ingredients and step-by-step tutorials for
                delicious Indian dishes
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for Indian recipes..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full py-4 px-6 pr-12 rounded-full bg-white dark:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Featured Recipes */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Featured Recipes
            </h2>
            <button className="text-orange-500 hover:text-orange-600 font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.slice(0, 3).map((recipe, index) => (
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
        </section>

        {/* Recipe Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Recipe Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "North Indian",
                image:
                  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "South Indian",
                image:
                  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Street Food",
                image:
                  "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Vegetarian",
                image:
                  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative rounded-xl overflow-hidden h-40"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Recipes */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            All Recipes
          </h2>

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
        </section>
      </div>
    </Layout>
  );
};

export default Index;
