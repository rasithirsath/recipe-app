import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
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
                src="https://images.unsplash.com/photo-1556911073-52527ac43761?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
                alt="About Us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            </div>
            <div className="relative py-24 px-8 md:px-16 lg:px-24 max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                About Bachelor's Recipe
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-white/90 mb-8"
              >
                We're on a mission to make cooking approachable, fun, and
                delicious for young people learning to navigate the kitchen.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Bachelor's Recipe was born from a simple observation: too many
                young people were relying on takeout and processed foods, not
                because they didn't want to cook, but because they found it
                intimidating and time-consuming.
              </p>
              <p>
                Founded in 2025 by a group of food-loving friends who struggled
                with cooking in their early twenties, we set out to create a
                solution that would make home cooking accessible to everyone,
                regardless of their experience level.
              </p>
              <p>
                Our recipe kits eliminate the intimidating parts of cooking—the
                meal planning, the grocery shopping, the measuring, and the food
                waste—while preserving the creative and rewarding aspects that
                make cooking such a fulfilling activity.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Our Mission */}
        <section className="mb-20 bg-gray-50 dark:bg-gray-800/50 py-16 px-4 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Our Mission
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="h-14 w-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Simplify Cooking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We provide pre-measured ingredients and step-by-step
                    instructions that make cooking foolproof, even for
                    beginners.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="h-14 w-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Reduce Food Waste
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our pre-portioned ingredients mean you only get exactly what
                    you need, eliminating unused ingredients and food waste.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="h-14 w-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Build Confidence
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    As you follow our recipes, you'll develop skills and
                    confidence that will last a lifetime in the kitchen.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              How It Works
            </h2>

            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -right-4 -top-4 h-16 w-16 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      1
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                      alt="Choose Your Recipes"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Choose Your Recipes
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Browse through our diverse collection of recipes designed
                    for all skill levels. From quick 15-minute meals to more
                    elaborate weekend projects, there's something for everyone.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Receive Your Kit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Your recipe kit arrives at your door in environmentally
                    friendly packaging. Each ingredient is perfectly
                    pre-measured and labeled, along with a detailed recipe card.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -left-4 -top-4 h-16 w-16 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      2
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                      alt="Receive Your Kit"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -right-4 -top-4 h-16 w-16 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      3
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                      alt="Cook and Enjoy"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Cook and Enjoy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Follow our simple step-by-step instructions to create a
                    delicious meal. No experience necessary! Build confidence in
                    the kitchen and enjoy the satisfaction of a home-cooked
                    meal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Akash Kanna",
                  role: "Founder",
                  image: "https://i.postimg.cc/T3PY3xWn/fou.jpg",
                },
                {
                  name: "Adham Rashad",
                  role: "Co-Founder",
                  image: "https://i.postimg.cc/1X9cg4S9/co-founder.jpg",
                },
                {
                  name: "Mohamed Rasith",
                  role: "Technical Support",
                  image: "https://i.postimg.cc/XNQ9Hj3C/tech-support.jpg",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-orange-500">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl py-16 px-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Cooking Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the joy of
            cooking with Bachelor's Recipe.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Today
          </motion.button>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
