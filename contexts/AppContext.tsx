import React, { createContext, useContext, useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Recipe {
  id: string;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  price: number;
}

interface CartItem {
  recipe: Recipe;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  darkMode: boolean;
  notification: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
    id: string;
  };
  recipes: Recipe[];
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: Recipe }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DARK_MODE" }
  | {
      type: "SHOW_NOTIFICATION";
      payload: { message: string; type: "success" | "error" | "info" };
    }
  | { type: "HIDE_NOTIFICATION" };

// Initial state
const initialState: AppState = {
  cart: [],
  darkMode: false,
  notification: {
    show: false,
    message: "",
    type: "info",
    id: "",
  },
  recipes: [
    {
      id: "1",
      name: "Sambar",
      image: "https://i.postimg.cc/CLD7vZMx/IMG-20250422-WA0009-min.jpg",
      description:
        "Sambar is a flavorful South Indian lentil stew made with toor dal, tamarind, mixed vegetables, and aromatic spices, typically served with rice or idli.",
      ingredients: [
        "1 cup toor dal (pigeon peas)",
        "1 onion (chopped)",
        "1 tomato (chopped)",
        "1 carrot (diced)",
        "1 potato (diced)",
        "1/2 cup drumstick (optional)",
        "2 tbsp sambar powder",
        "1/4 tsp turmeric powder",
        "1 tsp mustard seeds",
        "1/4 tsp asafoetida (hing)",
        "2-3 dried red chilies",
        "Curry leaves",
        "Tamarind extract (from a small piece of tamarind)",
        "Salt to taste",
        "Oil for tempering",
      ],
      instructions: [
        "Pressure cook the toor dal until soft.",
        "Heat oil in a pan, add mustard seeds, dried red chilies, and curry leaves. Once they splutter, add onions and sauté until golden.",
        "Add chopped tomatoes, turmeric powder, and sambar powder. Cook for 2 minutes.",
        "Add the cooked dal, vegetables, and tamarind extract. Cook until vegetables are tender.",
        "Add salt and simmer for 10-15 minutes. Serve with idli, dosa, or rice.",
      ],
      prepTime: "15 mins",
      cookTime: "20 mins",
      nutrition: {
        calories: 380,
        protein: 18,
        carbs: 12,
        fat: 24,
      },
      price: 120,
    },
    {
      id: "2",
      name: "Rasam",
      image: "https://i.postimg.cc/76HsTqSn/rasam-packet-min-1.png",
      description:
        "Rasam is a tangy and spicy South Indian soup made with tamarind juice, tomatoes, and a blend of traditional spices, often served with rice.",
      ingredients: [
        "2 tomatoes (chopped)",
        "1/4 cup tamarind extract",
        "1/2 tsp mustard seeds",
        "1/2 tsp cumin seeds",
        "1/4 tsp black pepper",
        "1-2 green chilies (slit)",
        "1 tsp ginger-garlic paste",
        "1 tsp rasam powder",
        "Curry leaves",
        "1 tbsp ghee (clarified butter)",
        "Salt to taste",
        "Fresh coriander (for garnish)",
      ],
      instructions: [
        "In a pot, boil tamarind extract with chopped tomatoes until soft and mushy.",
        "Heat ghee in a pan, add mustard seeds, cumin seeds, black pepper, green chilies, and curry leaves. Let them splutter.",
        "Add ginger-garlic paste and sauté for a minute.",
        "Add rasam powder and mix well. Pour in the tamarind and tomato mixture, add salt, and bring it to a boil.",
        "Simmer for 5-10 minutes. Garnish with fresh coriander leaves and serve with rice.",
      ],
      prepTime: "30 mins",
      cookTime: "25 mins",
      nutrition: {
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 18,
      },
      price: 120,
    },
    {
      id: "3",
      name: "Kadala Curry",
      image: "https://i.postimg.cc/bNzr5WpS/IMG-20250422-WA0010-min.jpg",
      description:
        "Kadala Curry is a flavorful Kerala-style dish made with black chickpeas cooked in a spicy coconut-based gravy, typically served with puttu or appam.",
      ingredients: [
        "1 cup black chickpeas (soaked overnight)",
        "1 onion (chopped)",
        "1 tomato (chopped)",
        "1 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "1 tsp coriander powder",
        "1 tsp cumin powder",
        "1/2 cup grated coconut",
        "1-2 green chilies (slit)",
        "1/2 tsp mustard seeds",
        "Curry leaves",
        "Salt to taste",
        "Coconut oil for tempering",
      ],
      instructions: [
        "Pressure cook soaked black chickpeas with water and turmeric until soft.",
        "In a pan, heat coconut oil and add mustard seeds. Once they splutter, add curry leaves and chopped onions. Sauté until onions turn golden.",
        "Add ginger-garlic paste and chopped tomatoes. Cook for a few minutes until tomatoes soften.",
        "Add coriander powder, cumin powder, and salt. Cook for 2 minutes.",
        "Add the cooked chickpeas along with some of the cooking water, and bring it to a boil.",
        "Grind grated coconut with some water into a smooth paste. Add the coconut paste to the curry and cook for 10-15 minutes.",
        "Serve hot with appam, rice, or paratha.",
      ],
      prepTime: " 25mins",
      cookTime: "20 mins",
      nutrition: {
        calories: 320,
        protein: 8,
        carbs: 58,
        fat: 10,
      },
      price: 150,
    },
    {
      id: "4",
      name: "Chicken Biryani",
      image: "https://i.postimg.cc/wjgrL55p/IMG-20250422-WA0013-min.jpg",
      description:
        "Chicken Biryani is a rich and aromatic rice dish made by layering marinated chicken with basmati rice, saffron, and spices, then slow-cooked to perfection.",
      ingredients: [
        "Chicken – 150g (with bone or boneless)",
        "Basmati rice – ½ cup (soaked 20 mins)",
        "Onion – 1 small (sliced)",
        "Tomato – 1 small (chopped)",
        "Curd – 2 tbsp",
        "Ginger garlic paste – 1 tsp",
        "Green chili – 1 (slit)",
        "Biryani masala – 1 tsp",
        "Red chili powder – ½ tsp",
        "Turmeric – ¼ tsp",
        "Garam masala – ½ tsp",
        "Mint & coriander – a few leaves",
        "Ghee – 1 tsp",
        "Oil – 1 tbsp",
        "Water – ¾ cup",
        "Salt – as needed",
      ],
      instructions: [
        "Heat oil + ghee. Add onions and sauté until golden.",
        "Add ginger garlic paste, green chili. Fry till raw smell goes.",
        "Add tomato, salt, turmeric, chili powder, and biryani masala. Cook till soft.",
        "Add chicken, curd, mint, coriander. Cook for 5–7 mins.",
        "Add soaked rice, water. Adjust salt.",
        "Cover and cook on low until rice is done (about 12–15 mins).",
        "Let it rest for 5 mins, fluff, and serve hot with raita.",
      ],
      prepTime: "35 mins",
      cookTime: "30 mins",
      nutrition: {
        calories: 420,
        protein: 28,
        carbs: 12,
        fat: 26,
      },
      price: 190,
    },
    {
      id: "5",
      name: "Vatha Kuzhambu",
      image: "https://i.postimg.cc/brwScBkT/IMG-20250422-WA0008-min.jpg",
      description:
        "Vatha Kuzhambu is a tangy South Indian tamarind-based curry simmered with sun-dried berries (manathakkali or sundakkai) and a flavorful blend of spices.",
      ingredients: [
        "1 cup tamarind extract",
        "1/2 cup dried vathals (like sundakkai, manathakkali, or any dried vegetable)",
        "1 onion (sliced)",
        "1 tomato (chopped)",
        "1 tbsp sambar powder",
        "1/4 tsp turmeric powder",
        "1 tsp mustard seeds",
        "1/2 tsp fenugreek seeds",
        "Curry leaves",
        "Salt to taste",
        "Oil for tempering",
      ],
      instructions: [
        "Heat oil in a pan, add mustard seeds, fenugreek seeds, and curry leaves. Let them splutter.",
        "Add onions and sauté until golden. Add tomatoes and cook until soft.",
        "Add tamarind extract, turmeric powder, sambar powder, and salt. Bring to a boil.",
        "Add the dried vathals and cook for 10-15 minutes. Let it simmer until the curry thickens.",
        "Serve with steamed rice.",
      ],
      prepTime: "40 mins",
      cookTime: "30 mins",
      nutrition: {
        calories: 350,
        protein: 8,
        carbs: 60,
        fat: 12,
      },
      price: 130,
    },
    {
      id: "6",
      name: "Meal Maker",
      image: "https://i.postimg.cc/htBgX73F/IMG-20250422-WA0011-min.jpg",
      description:
        "Meal Maker (Soya Chunks) is a protein-rich vegetarian dish cooked with spicy masala, often enjoyed with rice or roti for a hearty meal.",
      ingredients: [
        "Meal maker – ½ cup",
        "Onion – 1 small (chopped)",
        "Tomato – 1 small (chopped)",
        "Ginger garlic paste – 1 tsp",
        "Chili powder – ½ tsp",
        "Coriander powder – 1 tsp",
        "Garam masala – ½ tsp",
        "Turmeric – ¼ tsp",
        "Oil – 1 tbsp",
        "Coriander leaves – for garnish",
        "Salt – as needed",
      ],
      instructions: [
        "Boil soya chunks in hot water with salt for 5 mins. Squeeze and set aside.",
        "Heat oil, sauté onion till golden.",
        "Add ginger garlic paste. Fry till raw smell goes.",
        "Add tomato, all spices, salt. Cook till mushy.",
        "Add meal maker and little water. Cook for 8–10 mins till masala coats well.",
        "Garnish with coriander and serve with rice or roti.",
      ],
      prepTime: "25 mins",
      cookTime: "20 mins",
      nutrition: {
        calories: 350,
        protein: 8,
        carbs: 60,
        fat: 12,
      },
      price: 120,
    },
    {
      id: "7",
      name: "Somberi Chicken",
      image: "https://i.postimg.cc/sX6HRbbf/IMG-20250422-WA0012-min.jpg",
      description:
        "Somberi Chicken is a lazy-cook’s delight, made by tossing chicken in minimal spices and slow-cooking it for maximum flavor with minimum effort.",
      ingredients: [
        "Chicken – 150g (boneless or small pieces)",
        "Ginger garlic paste – 1 tsp",
        "Chili powder – 1 tsp",
        "Turmeric – ¼ tsp",
        "Salt – to taste",
        "Curd – 1 tbsp",
        "Oil – 1 tbsp",
        "Curry leaves – optional",
      ],
      instructions: [
        "Mix chicken with all ingredients. Marinate for 15 mins (or more).",
        "Heat oil in a pan, add chicken.",
        "Cover and cook on low, stirring occasionally, until fully cooked and roasted (15–20 mins).",
        "Optional: Add curry leaves for extra aroma.",
        "Serve as a spicy dry side dish.",
      ],
      prepTime: "15 mins",
      cookTime: "10 mins",
      nutrition: {
        calories: 350,
        protein: 8,
        carbs: 60,
        fat: 12,
      },
      price: 100,
    },
  ],
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.recipe.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.recipe.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { recipe: action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.recipe.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.recipe.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "TOGGLE_DARK_MODE":
      const newDarkMode = !state.darkMode;
      // Update body class for dark mode
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return {
        ...state,
        darkMode: newDarkMode,
      };

    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notification: {
          show: true,
          message: action.payload.message,
          type: action.payload.type,
          id: Date.now().toString(), // Unique ID for each notification
        },
      };

    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notification: {
          ...state.notification,
          show: false,
        },
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      dispatch({ type: "TOGGLE_DARK_MODE" });
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", state.darkMode.toString());
  }, [state.darkMode]);

  // Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (state.notification.show) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
      <AnimatePresence>
        {state.notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 ${
              state.notification.type === "success"
                ? "bg-green-500"
                : state.notification.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            } text-white`}
          >
            <p>{state.notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </AppContext.Provider>
  );
};

// Custom hook for using context
export const useAppContext = () => useContext(AppContext);

// Types export
export type { Recipe, CartItem };
