<script setup>
import { computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products.js'
import { useCart } from '../stores/cart.js'

const { products, categories } = useProducts()
const { addToCart } = useCart()

const featuredProducts = computed(() => {
  return products.value.slice(0, 4)
})

const specialOffers = computed(() => {
  return products.value.filter(product => product.originalPrice > product.price).slice(0, 2)
})

const getCategoryIcon = (category) => {
  const icons = {
    consolas: 'fas fa-tv',
    videojuegos: 'fas fa-gamepad',
    accesorios: 'fas fa-headphones'
  }
  return icons[category] || 'fas fa-box'
}

const getCategoryName = (category) => {
  const names = {
    consolas: 'Consolas',
    videojuegos: 'Videojuegos',
    accesorios: 'Accesorios'
  }
  return names[category] || category
}

const getCategoryDescription = (category) => {
  const descriptions = {
    consolas: 'Las mejores consolas de PlayStation, Xbox y Nintendo',
    videojuegos: 'Los títulos más populares y nuevos lanzamientos',
    accesorios: 'Controles, auriculares y accesorios gaming'
  }
  return descriptions[category] || 'Productos de calidad'
}
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">
              Bienvenido a <span class="text-primary">GameStore</span>
            </h1>
            <p class="hero-subtitle">
              Tu tienda de confianza para consolas, videojuegos y accesorios gaming. 
              Encuentra los mejores productos con precios increíbles.
            </p>
            <div class="hero-buttons">
              <router-link to="/productos" class="btn btn-primary btn-lg me-3">
                <i class="fas fa-shopping-bag me-2"></i>
                Ver Productos
              </router-link>
              <router-link to="/consolas" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-gamepad me-2"></i>
                Explorar Consolas
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop" alt="Gaming" class="img-fluid rounded">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <i class="fas fa-users fa-2x text-primary mb-3"></i>
              <h3 class="stat-number">10,000+</h3>
              <p class="stat-label">Clientes Satisfechos</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <i class="fas fa-shipping-fast fa-2x text-success mb-3"></i>
              <h3 class="stat-number">24h</h3>
              <p class="stat-label">Envío Rápido</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <i class="fas fa-shield-alt fa-2x text-warning mb-3"></i>
              <h3 class="stat-number">100%</h3>
              <p class="stat-label">Garantía</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <i class="fas fa-headset fa-2x text-info mb-3"></i>
              <h3 class="stat-number">24/7</h3>
              <p class="stat-label">Soporte</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Productos Destacados</h2>
          <p class="section-subtitle">Los productos más populares de nuestra tienda</p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="product in featuredProducts" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section py-5 bg-light">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Explora por Categorías</h2>
          <p class="section-subtitle">Encuentra lo que buscas en nuestras categorías especializadas</p>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="category in categories" :key="category">
            <div class="category-card">
              <div class="category-icon">
                <i :class="getCategoryIcon(category)"></i>
              </div>
              <h4 class="category-title">{{ getCategoryName(category) }}</h4>
              <p class="category-description">{{ getCategoryDescription(category) }}</p>
              <router-link :to="`/${category}`" class="btn btn-outline-primary">
                Ver Productos
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Offers -->
    <section class="offers-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Ofertas Especiales</h2>
          <p class="section-subtitle">Aprovecha nuestros descuentos exclusivos</p>
        </div>
        <div class="row">
          <div class="col-lg-6 mb-4" v-for="product in specialOffers" :key="product.id">
            <div class="offer-card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="product.image" :alt="product.name" class="offer-image">
                </div>
                <div class="col-md-8">
                  <div class="offer-content">
                    <h5 class="offer-title">{{ product.name }}</h5>
                    <p class="offer-description">{{ product.description }}</p>
                    <div class="offer-price">
                      <span class="current-price">${{ product.price }}</span>
                      <span class="original-price">${{ product.originalPrice }}</span>
                    </div>
                    <button class="btn btn-primary btn-sm" @click="addToCart(product)">
                      <i class="fas fa-shopping-cart me-1"></i>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section py-5 bg-primary text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h3 class="newsletter-title">¡Mantente Informado!</h3>
            <p class="newsletter-subtitle">
              Suscríbete a nuestro newsletter para recibir las últimas ofertas y novedades
            </p>
            <div class="newsletter-form">
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Tu correo electrónico">
                <button class="btn btn-light" type="button">
                  <i class="fas fa-paper-plane me-1"></i>
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: 100px 0 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-top: 76px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  margin-bottom: 2rem;
}

.hero-image img {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stats-section {
  background: #f8f9fa;
}

.stat-item {
  padding: 2rem 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.category-description {
  color: #666;
  margin-bottom: 1.5rem;
}

.offer-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.offer-card:hover {
  transform: translateY(-3px);
}

.offer-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.offer-content {
  padding: 1.5rem;
}

.offer-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.offer-description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.offer-price {
  margin-bottom: 1rem;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #28a745;
}

.original-price {
  font-size: 1rem;
  color: #6c757d;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.newsletter-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.newsletter-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.newsletter-subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form .input-group {
  max-width: 500px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
