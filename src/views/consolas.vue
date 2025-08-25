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

const consolasProducts = computed(() => {
  let filtered = getProductsByCategory('consolas')
  
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
  <div class="consolas-page">
    <div class="container mt-5 pt-5">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="page-title">Consolas Gaming</h1>
          <p class="page-subtitle">Las mejores consolas de PlayStation, Xbox y Nintendo</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="search-container">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar consolas..."
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
      <div class="row" v-if="consolasProducts.length > 0">
        <div class="col-lg-4 col-md-6 mb-4" v-for="product in consolasProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Sin resultados -->
      <div class="row" v-else>
        <div class="col-12 text-center py-5">
          <i class="fas fa-tv fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No se encontraron consolas</h4>
          <p class="text-muted">Intenta ajustar tus filtros de búsqueda</p>
          <button class="btn btn-primary" @click="clearFilters">
            <i class="fas fa-times me-1"></i>
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="info-section">
            <h3 class="info-title">¿Por qué elegir nuestras consolas?</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h5>Garantía Oficial</h5>
                  <p>Todas nuestras consolas incluyen garantía oficial del fabricante y soporte técnico especializado.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shipping-fast"></i>
                  </div>
                  <h5>Envío Rápido</h5>
                  <p>Recibe tu consola en 24-48 horas con nuestro servicio de envío express y seguimiento en tiempo real.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-headset"></i>
                  </div>
                  <h5>Soporte 24/7</h5>
                  <p>Nuestro equipo de expertos está disponible para resolver cualquier duda sobre tu consola.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-gamepad"></i>
                  </div>
                  <h5>Accesorios Incluidos</h5>
                  <p>Muchas de nuestras consolas incluyen accesorios adicionales como controles extra o juegos.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <h5>Financiamiento</h5>
                  <p>Opciones de pago flexibles con tarjeta de crédito o cuotas sin intereses en productos seleccionados.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-exchange-alt"></i>
                  </div>
                  <h5>Cambio Gratuito</h5>
                  <p>30 días de cambio gratuito si no estás satisfecho con tu consola por cualquier motivo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparación de consolas -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="comparison-section">
            <h3 class="comparison-title">Comparación de Consolas</h3>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Característica</th>
                    <th>PlayStation 5</th>
                    <th>Xbox Series X</th>
                    <th>Nintendo Switch OLED</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Resolución Máxima</strong></td>
                    <td>4K</td>
                    <td>4K</td>
                    <td>720p (portátil) / 1080p (TV)</td>
                  </tr>
                  <tr>
                    <td><strong>Almacenamiento</strong></td>
                    <td>825GB SSD</td>
                    <td>1TB SSD</td>
                    <td>64GB</td>
                  </tr>
                  <tr>
                    <td><strong>Exclusivos</strong></td>
                    <td>God of War, Spider-Man</td>
                    <td>Halo, Forza</td>
                    <td>Mario, Zelda</td>
                  </tr>
                  <tr>
                    <td><strong>Precio</strong></td>
                    <td>$499.99</td>
                    <td>$499.99</td>
                    <td>$349.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.consolas-page {
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

.info-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.feature-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.feature-card h5 {
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.comparison-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comparison-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.table {
  border-radius: 10px;
  overflow: hidden;
}

.table thead th {
  background: #667eea;
  color: white;
  border: none;
  font-weight: 600;
  text-align: center;
}

.table tbody td {
  vertical-align: middle;
  border-color: #e9ecef;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .info-title,
  .comparison-title {
    font-size: 1.5rem;
  }
  
  .table-responsive {
    font-size: 0.9rem;
  }
}
</style>