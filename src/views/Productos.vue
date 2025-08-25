<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products.js'

const { 
  products, 
  filteredProducts, 
  searchQuery: storeSearchQuery, 
  selectedCategory: storeSelectedCategory, 
  sortBy: storeSortBy,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  getProductsByCategory
} = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value
})

const handleSearch = () => {
  setSearchQuery(searchQuery.value)
}

const handleCategoryChange = () => {
  setSelectedCategory(selectedCategory.value)
}

const handleSortChange = () => {
  setSortBy(sortBy.value)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'name'
  setSearchQuery('')
  setSelectedCategory('')
  setSortBy('name')
}

const clearSearch = () => {
  searchQuery.value = ''
  setSearchQuery('')
}

const clearCategory = () => {
  selectedCategory.value = ''
  setSelectedCategory('')
}

const getCategoryName = (category) => {
  const names = {
    consolas: 'Consolas',
    videojuegos: 'Videojuegos',
    accesorios: 'Accesorios'
  }
  return names[category] || category
}
</script>

<template>
  <div class="productos-page">
    <div class="container mt-5 pt-5">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="page-title">Catálogo de Productos</h1>
          <p class="page-subtitle">Explora nuestra amplia selección de productos gaming</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="search-container">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar productos..."
              v-model="searchQuery"
              @input="handleSearch"
            >
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <select class="form-select" v-model="selectedCategory" @change="handleCategoryChange">
            <option value="">Todas las categorías</option>
            <option value="consolas">Consolas</option>
            <option value="videojuegos">Videojuegos</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
        <div class="col-md-3 mb-3">
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

      <!-- Resultados -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="results-info">
            <span class="results-count">{{ filteredProducts.length }} productos encontrados</span>
            <div class="active-filters" v-if="hasActiveFilters">
              <span class="filter-badge" v-if="searchQuery">
                Búsqueda: "{{ searchQuery }}"
                <i class="fas fa-times ms-1" @click="clearSearch"></i>
              </span>
              <span class="filter-badge" v-if="selectedCategory">
                Categoría: {{ getCategoryName(selectedCategory) }}
                <i class="fas fa-times ms-1" @click="clearCategory"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Productos -->
      <div class="row" v-if="filteredProducts.length > 0">
        <div class="col-lg-3 col-md-6 mb-4" v-for="product in filteredProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Sin resultados -->
      <div class="row" v-else>
        <div class="col-12 text-center py-5">
          <i class="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No se encontraron productos</h4>
          <p class="text-muted">Intenta ajustar tus filtros de búsqueda</p>
          <button class="btn btn-primary" @click="clearFilters">
            <i class="fas fa-times me-1"></i>
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="stats-section">
            <div class="row text-center">
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-card">
                  <i class="fas fa-box fa-2x text-primary mb-2"></i>
                  <h4>{{ products.length }}</h4>
                  <p>Total Productos</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-card">
                  <i class="fas fa-tv fa-2x text-success mb-2"></i>
                  <h4>{{ getProductsByCategory('consolas').length }}</h4>
                  <p>Consolas</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-card">
                  <i class="fas fa-gamepad fa-2x text-warning mb-2"></i>
                  <h4>{{ getProductsByCategory('videojuegos').length }}</h4>
                  <p>Videojuegos</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-card">
                  <i class="fas fa-headphones fa-2x text-info mb-2"></i>
                  <h4>{{ getProductsByCategory('accesorios').length }}</h4>
                  <p>Accesorios</p>
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
.productos-page {
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

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-count {
  font-weight: 600;
  color: #333;
}

.active-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-badge:hover {
  background: #5a6fd8;
}

.filter-badge i {
  cursor: pointer;
}

.stats-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card {
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-card h4 {
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: #666;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .results-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .active-filters {
    justify-content: flex-start;
  }
}
</style>
