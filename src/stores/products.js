import { reactive, computed } from 'vue'

// Estado global de productos
const productsState = reactive({
  products: [
    {
      id: 1,
      name: "PlayStation 5",
      category: "consolas",
      price: 499.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
      description: "La consola más potente de Sony con gráficos de nueva generación y SSD ultrarrápido.",
      rating: 4.8,
      stock: 15,
      features: ["4K Gaming", "Ray Tracing", "SSD 825GB", "DualSense Controller"]
    },
    {
      id: 2,
      name: "Xbox Series X",
      category: "consolas",
      price: 499.99,
      originalPrice: 549.99,
      image: "/src/imgnes/xboxseriesx.png",
      description: "La consola más potente de Microsoft con Game Pass y retrocompatibilidad.",
      rating: 4.7,
      stock: 12,
      features: ["4K Gaming", "Game Pass", "SSD 1TB", "Backward Compatibility"]
    },
    {
      id: 3,
      name: "Nintendo Switch OLED",
      category: "consolas",
      price: 349.99,
      originalPrice: 399.99,
      image: "/src/imgnes/nintendoled.jpeg",
      description: "La versión mejorada de Nintendo Switch con pantalla OLED de 7 pulgadas.",
      rating: 4.6,
      stock: 20,
      features: ["OLED Screen", "Portable Gaming", "Nintendo Games", "Joy-Con Controllers"]
    },
    {
      id: 4,
      name: "The Legend of Zelda: Tears of the Kingdom",
      category: "videojuegos",
      price: 59.99,
      originalPrice: 69.99,
      image: "/src/imgnes/zelda.jpg",
      description: "La nueva aventura de Link en el reino de Hyrule con mecánicas revolucionarias.",
      rating: 4.9,
      stock: 25,
      features: ["Open World", "Ultrahand Ability", "Sky Islands", "Underground"]
    },
    {
      id: 5,
      name: "God of War Ragnarök",
      category: "videojuegos",
      price: 69.99,
      originalPrice: 79.99,
      image: "/src/imgnes/Godofwar.jpg",
      description: "Kratos y Atreus enfrentan el Ragnarök en esta épica aventura nórdica.",
      rating: 4.8,
      stock: 18,
      features: ["Epic Story", "Norse Mythology", "Combat System", "Graphics"]
    },
    {
      id: 6,
      name: "Elden Ring",
      category: "videojuegos",
      price: 59.99,
      originalPrice: 69.99,
      image: "src/imgnes/EldenRing.avif",
      description: "Un mundo abierto épico creado por FromSoftware y George R.R. Martin.",
      rating: 4.7,
      stock: 22,
      features: ["Open World", "Souls-like", "Multiplayer", "Boss Battles"]
    },
    {
      id: 7,
      name: "DualSense Controller",
      category: "accesorios",
      price: 69.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop",
      description: "El controlador oficial de PlayStation 5 con haptic feedback y adaptive triggers.",
      rating: 4.5,
      stock: 30,
      features: ["Haptic Feedback", "Adaptive Triggers", "Built-in Mic", "USB-C"]
    },
    {
      id: 8,
      name: "Xbox Wireless Controller",
      category: "accesorios",
      price: 59.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop",
      description: "Controlador oficial de Xbox Series X/S con diseño ergonómico.",
      rating: 4.4,
      stock: 25,
      features: ["Wireless", "Ergonomic Design", "Compatible", "Battery Life"]
    },
    {
      id: 9,
      name: "Gaming Headset Pro",
      category: "accesorios",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      description: "Auriculares gaming con sonido surround 7.1 y micrófono con cancelación de ruido.",
      rating: 4.3,
      stock: 15,
      features: ["7.1 Surround", "Noise Cancelling", "Comfortable", "RGB"]
    }
  ],
  categories: ["consolas", "videojuegos", "accesorios"],
  searchQuery: "",
  selectedCategory: "",
  sortBy: "name"
})

// Funciones para manejar productos
export const useProducts = () => {
  const filteredProducts = computed(() => {
    let filtered = productsState.products

    // Filtrar por búsqueda
    if (productsState.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productsState.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(productsState.searchQuery.toLowerCase())
      )
    }

    // Filtrar por categoría
    if (productsState.selectedCategory) {
      filtered = filtered.filter(product => product.category === productsState.selectedCategory)
    }

    // Ordenar
    switch (productsState.sortBy) {
      case 'price-asc':
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
      default:
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  })

  const getProductById = (id) => {
    return productsState.products.find(product => product.id === id)
  }

  const getProductsByCategory = (category) => {
    return productsState.products.filter(product => product.category === category)
  }

  const setSearchQuery = (query) => {
    productsState.searchQuery = query
  }

  const setSelectedCategory = (category) => {
    productsState.selectedCategory = category
  }

  const setSortBy = (sortBy) => {
    productsState.sortBy = sortBy
  }

  const updateProductStock = (productId, newStock) => {
    const product = productsState.products.find(p => p.id === productId)
    if (product) {
      product.stock = newStock
    }
  }

  return {
    products: computed(() => productsState.products),
    categories: computed(() => productsState.categories),
    searchQuery: computed(() => productsState.searchQuery),
    selectedCategory: computed(() => productsState.selectedCategory),
    sortBy: computed(() => productsState.sortBy),
    filteredProducts,
    getProductById,
    getProductsByCategory,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    updateProductStock
  }
}
