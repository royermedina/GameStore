<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products.js'

const { 
  products, 
  setSearchQuery, 
  setSortBy, 
  getProductsByCategory 
} = useProducts()

const searchQuery = ref('')
const sortBy = ref('name')

const videojuegosProducts = computed(() => {
  let filtered = getProductsByCategory('videojuegos')
  
  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  switch (sortBy.value) {
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

const gameCategories = [
  {
    name: 'Acción',
    icon: 'fas fa-fist-raised',
    description: 'Juegos de acción y aventura',
    avgRating: 4.5,
    minPrice: 29.99
  },
  {
    name: 'RPG',
    icon: 'fas fa-dragon',
    description: 'Role-playing games épicos',
    avgRating: 4.7,
    minPrice: 39.99
  },
  {
    name: 'Estrategia',
    icon: 'fas fa-chess',
    description: 'Juegos de estrategia y táctica',
    avgRating: 4.3,
    minPrice: 24.99
  },
  {
    name: 'Deportes',
    icon: 'fas fa-futbol',
    description: 'Simuladores deportivos',
    avgRating: 4.2,
    minPrice: 19.99
  }
]

const platforms = [
  {
    name: 'PlayStation',
    icon: 'fab fa-playstation',
    description: 'Juegos para PS4 y PS5',
    features: ['4K Gaming', 'Ray Tracing', 'DualSense']
  },
  {
    name: 'Xbox',
    icon: 'fab fa-xbox',
    description: 'Juegos para Xbox One y Series X',
    features: ['Game Pass', 'Quick Resume', 'Smart Delivery']
  },
  {
    name: 'Nintendo',
    icon: 'fas fa-gamepad',
    description: 'Juegos para Switch',
    features: ['Portable', 'Local Co-op', 'Nintendo Online']
  },
  {
    name: 'PC',
    icon: 'fas fa-desktop',
    description: 'Juegos para Windows',
    features: ['Mods', 'Ray Tracing', 'Ultra Settings']
  }
]

const handleSearch = () => {
  setSearchQuery(searchQuery.value)
}

const handleSortChange = () => {
  setSortBy(sortBy.value)
}

const clearFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'name'
  setSearchQuery('')
  setSortBy('name')
}
</script>

<template>
  <div class="videojuegos-page">
    <div class="container mt-5 pt-5">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="page-title">Videojuegos</h1>
          <p class="page-subtitle">Los mejores títulos para todas las plataformas</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="search-container">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar videojuegos..."
              v-model="searchQuery"
              @input="handleSearch"
            >
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <select class="form-select" v-model="sortBy" @change="handleSortChange">
            <option value="name">Ordenar por nombre</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Por calificación</option>
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <button class="btn btn-outline-secondary w-100" @click="clearFilters">
            <i class="fas fa-times me-1"></i>
            Limpiar
          </button>
        </div>
      </div>

      <!-- Productos -->
      <div class="row" v-if="videojuegosProducts.length > 0">
        <div class="col-lg-4 col-md-6 mb-4" v-for="product in videojuegosProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Sin resultados -->
      <div class="row" v-else>
        <div class="col-12 text-center py-5">
          <i class="fas fa-gamepad fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No se encontraron videojuegos</h4>
          <p class="text-muted">Intenta ajustar tus filtros de búsqueda</p>
          <button class="btn btn-primary" @click="clearFilters">
            <i class="fas fa-times me-1"></i>
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Categorías populares -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="categories-section">
            <h3 class="categories-title">Categorías Populares</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4" v-for="category in gameCategories" :key="category.name">
                <div class="category-card">
                  <div class="category-icon">
                    <i :class="category.icon"></i>
                  </div>
                  <h5>{{ category.name }}</h5>
                  <p>{{ category.description }}</p>
                  <div class="category-stats">
                    <span class="stat">
                      <i class="fas fa-star"></i>
                      {{ category.avgRating }}
                    </span>
                    <span class="stat">
                      <i class="fas fa-dollar-sign"></i>
                      Desde ${{ category.minPrice }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="info-section">
            <h3 class="info-title">¿Por qué comprar de nosotros?</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shipping-fast"></i>
                  </div>
                  <h5>Envío Inmediato</h5>
                  <p>Recibe tus juegos digitales al instante o físicos en 24-48 horas con envío express.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h5>Garantía Completa</h5>
                  <p>Todos nuestros juegos incluyen garantía de funcionamiento y soporte técnico especializado.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-tags"></i>
                  </div>
                  <h5>Mejores Precios</h5>
                  <p>Ofrecemos los precios más competitivos del mercado con descuentos exclusivos.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-gamepad"></i>
                  </div>
                  <h5>Ediciones Especiales</h5>
                  <p>Acceso a ediciones limitadas, coleccionistas y contenido exclusivo de desarrolladores.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-headset"></i>
                  </div>
                  <h5>Soporte Gaming</h5>
                  <p>Nuestro equipo de expertos gamers te ayuda a elegir los mejores títulos para ti.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-exchange-alt"></i>
                  </div>
                  <h5>Cambio Gratuito</h5>
                  <p>30 días para cambiar tu juego si no te convence, sin preguntas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Plataformas soportadas -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="platforms-section">
            <h3 class="platforms-title">Plataformas Soportadas</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4" v-for="platform in platforms" :key="platform.name">
                <div class="platform-card">
                  <div class="platform-icon">
                    <i :class="platform.icon"></i>
                  </div>
                  <h5>{{ platform.name }}</h5>
                  <p>{{ platform.description }}</p>
                  <div class="platform-features">
                    <span v-for="feature in platform.features" :key="feature" class="feature-tag">
                      {{ feature }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.videojuegos-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.search-container {
  position: relative;
}

.search-container input {
  padding-left: 40px;
  border-radius: 25px;
  border: 2px solid #e9ecef;
  transition: border-color 0.3s ease;
}

.search-container input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
}

.categories-section,
.info-section,
.platforms-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.categories-title,
.info-title,
.platforms-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.category-card,
.feature-card,
.platform-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
  height: 100%;
}

.category-card:hover,
.feature-card:hover,
.platform-card:hover {
  transform: translateY(-3px);
}

.category-icon,
.feature-icon,
.platform-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.category-card h5,
.feature-card h5,
.platform-card h5 {
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.category-card p,
.feature-card p,
.platform-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.category-stats {
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 500;
}

.platform-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
}

.feature-tag {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .categories-title,
  .info-title,
  .platforms-title {
    font-size: 1.5rem;
  }
  
  .category-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>