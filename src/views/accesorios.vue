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

const accesoriosProducts = computed(() => {
  let filtered = getProductsByCategory('accesorios')
  
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

const accessoryTypes = [
  {
    name: 'Controles',
    icon: 'fas fa-gamepad',
    description: 'Controles oficiales y de terceros para todas las consolas',
    features: ['Wireless', 'Ergonomic', 'Compatible']
  },
  {
    name: 'Auriculares',
    icon: 'fas fa-headphones',
    description: 'Auriculares gaming con micrófono y sonido surround',
    features: ['7.1 Surround', 'Noise Cancelling', 'RGB']
  },
  {
    name: 'Teclados',
    icon: 'fas fa-keyboard',
    description: 'Teclados mecánicos y de membrana para gaming',
    features: ['Mechanical', 'RGB', 'Programmable']
  },
  {
    name: 'Mouses',
    icon: 'fas fa-mouse',
    description: 'Mouses gaming con alta precisión y botones programables',
    features: ['High DPI', 'RGB', 'Ergonomic']
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
  <div class="accesorios-page">
    <div class="container mt-5 pt-5">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="page-title">Accesorios Gaming</h1>
          <p class="page-subtitle">Controles, auriculares y todo lo que necesitas para tu setup gaming</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="search-container">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar accesorios..."
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
      <div class="row" v-if="accesoriosProducts.length > 0">
        <div class="col-lg-4 col-md-6 mb-4" v-for="product in accesoriosProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Sin resultados -->
      <div class="row" v-else>
        <div class="col-12 text-center py-5">
          <i class="fas fa-headphones fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No se encontraron accesorios</h4>
          <p class="text-muted">Intenta ajustar tus filtros de búsqueda</p>
          <button class="btn btn-primary" @click="clearFilters">
            <i class="fas fa-times me-1"></i>
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Tipos de accesorios -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="types-section">
            <h3 class="types-title">Tipos de Accesorios</h3>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4" v-for="type in accessoryTypes" :key="type.name">
                <div class="type-card">
                  <div class="type-icon">
                    <i :class="type.icon"></i>
                  </div>
                  <h5>{{ type.name }}</h5>
                  <p>{{ type.description }}</p>
                  <div class="type-features">
                    <span v-for="feature in type.features" :key="feature" class="feature-tag">
                      {{ feature }}
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
            <h3 class="info-title">¿Por qué nuestros accesorios?</h3>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h5>Garantía Oficial</h5>
                  <p>Todos nuestros accesorios incluyen garantía oficial del fabricante y soporte técnico.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-shipping-fast"></i>
                  </div>
                  <h5>Envío Rápido</h5>
                  <p>Recibe tus accesorios en 24-48 horas con nuestro servicio de envío express.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-headset"></i>
                  </div>
                  <h5>Soporte Especializado</h5>
                  <p>Nuestro equipo de expertos te ayuda a elegir los mejores accesorios para tu setup.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-gamepad"></i>
                  </div>
                  <h5>Compatible Multi-plataforma</h5>
                  <p>Accesorios compatibles con PlayStation, Xbox, Nintendo Switch y PC.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-tags"></i>
                  </div>
                  <h5>Mejores Precios</h5>
                  <p>Ofrecemos los precios más competitivos con descuentos exclusivos en accesorios.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas fa-exchange-alt"></i>
                  </div>
                  <h5>Cambio Gratuito</h5>
                  <p>30 días para cambiar tu accesorio si no te convence, sin preguntas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Guía de compra -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="guide-section">
            <h3 class="guide-title">Guía de Compra</h3>
            <div class="row">
              <div class="col-lg-6 mb-4">
                <div class="guide-card">
                  <h5><i class="fas fa-gamepad me-2"></i>Controles</h5>
                  <ul>
                    <li>Verifica la compatibilidad con tu consola</li>
                    <li>Considera si necesitas controles inalámbricos o con cable</li>
                    <li>Revisa la duración de la batería</li>
                    <li>Evalúa la ergonomía y comodidad</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="guide-card">
                  <h5><i class="fas fa-headphones me-2"></i>Auriculares</h5>
                  <ul>
                    <li>Elige entre auriculares con cable o inalámbricos</li>
                    <li>Considera la calidad del micrófono</li>
                    <li>Verifica la compatibilidad multiplataforma</li>
                    <li>Evalúa la comodidad para sesiones largas</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="guide-card">
                  <h5><i class="fas fa-mouse me-2"></i>Periféricos PC</h5>
                  <ul>
                    <li>Considera el DPI y sensibilidad del mouse</li>
                    <li>Elige teclado mecánico o de membrana</li>
                    <li>Verifica la compatibilidad con tu sistema</li>
                    <li>Evalúa la iluminación RGB si es importante</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="guide-card">
                  <h5><i class="fas fa-tv me-2"></i>Monitores y TV</h5>
                  <ul>
                    <li>Considera la resolución y tasa de refresco</li>
                    <li>Evalúa el tiempo de respuesta</li>
                    <li>Verifica los puertos de conexión</li>
                    <li>Considera el tamaño ideal para tu espacio</li>
                  </ul>
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
.accesorios-page {
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

.types-section,
.info-section,
.guide-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.types-title,
.info-title,
.guide-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.type-card,
.feature-card,
.guide-card {
  padding: 1.5rem;
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
  height: 100%;
}

.type-card:hover,
.feature-card:hover {
  transform: translateY(-3px);
}

.type-icon,
.feature-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
  text-align: center;
}

.type-card h5,
.feature-card h5,
.guide-card h5 {
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.type-card p,
.feature-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.type-features {
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

.guide-card ul {
  list-style: none;
  padding: 0;
}

.guide-card li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.guide-card li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .types-title,
  .info-title,
  .guide-title {
    font-size: 1.5rem;
  }
  
  .type-features {
    justify-content: flex-start;
  }
}
</style>
