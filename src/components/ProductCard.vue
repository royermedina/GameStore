<script setup>
import { ref } from 'vue'
import { useCart } from '../stores/cart.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCart()
const showDetails = ref(false)
const isModalOpen = ref(false) // Nueva variable para controlar el estado del modal

const openModal = () => {
  isModalOpen.value = true
  showDetails.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  showDetails.value = false
  document.body.style.overflow = 'auto'
}

// Evitar que se abran tooltips cuando el modal está abierto
const shouldShowHover = ref(true)

const handleMouseEnter = () => {
  if (!isModalOpen.value) {
    shouldShowHover.value = true
  }
}

const handleMouseLeave = () => {
  shouldShowHover.value = false
}
</script>

<template>
  <div 
    class="product-card" 
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="{ 'modal-active': isModalOpen }"
  >
    <div class="product-image">
      <img :src="product.image" :alt="product.name" class="img-fluid">
      <div class="product-overlay" :class="{ 'show': shouldShowHover && !isModalOpen }">
        <button class="btn btn-primary btn-sm" @click="openModal">
          <i class="fas fa-eye me-1"></i>
          Ver
        </button>
      </div>
    </div>
    
    <div class="product-info">
      <h5 class="product-title">{{ product.name }}</h5>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-rating">
        <div class="stars">
          <i v-for="n in 5" :key="n" 
             :class="n <= Math.floor(product.rating) ? 'fas fa-star' : 'far fa-star'"
             :style="{ color: n <= Math.floor(product.rating) ? '#ffc107' : '#e4e5e9' }">
          </i>
        </div>
        <span class="rating-text">{{ product.rating }}</span>
      </div>
      
      <div class="product-features">
        <span v-for="feature in product.features.slice(0, 2)" :key="feature" 
              class="feature-tag">
          {{ feature }}
        </span>
      </div>
      
      <div class="product-price">
        <span class="current-price">${{ product.price }}</span>
        <span v-if="product.originalPrice > product.price" class="original-price">
          ${{ product.originalPrice }}
        </span>
      </div>
      
      <div class="product-stock">
        <span :class="product.stock > 0 ? 'in-stock' : 'out-of-stock'">
          <i :class="product.stock > 0 ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          {{ product.stock > 0 ? `${product.stock} disponibles` : 'Agotado' }}
        </span>
      </div>
      
      <button 
        class="btn btn-primary w-100 mt-2" 
        @click="addToCart(product)"
        :disabled="product.stock <= 0"
      >
        <i class="fas fa-shopping-cart me-1"></i>
        {{ product.stock > 0 ? 'Agregar al carrito' : 'Agotado' }}
      </button>
    </div>

    <!-- Modal grande -->
    <Transition name="modal">
      <div v-show="showDetails" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">{{ product.name }}</h5>
            <button type="button" class="close-btn" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img :src="product.image" :alt="product.name" class="img-fluid rounded">
              </div>
              <div class="col-md-6">
                <h6>Descripción</h6>
                <p>{{ product.description }}</p>
                
                <h6>Características</h6>
                <ul class="features-list">
                  <li v-for="feature in product.features" :key="feature">
                    <i class="fas fa-check text-success me-2"></i>
                    {{ feature }}
                  </li>
                </ul>
                
                <div class="rating-section">
                  <h6>Calificación</h6>
                  <div class="stars">
                    <i v-for="n in 5" :key="n" 
                       :class="n <= Math.floor(product.rating) ? 'fas fa-star' : 'far fa-star'"
                       :style="{ color: n <= Math.floor(product.rating) ? '#ffc107' : '#e4e5e9' }">
                    </i>
                    <span class="ms-2">{{ product.rating }}/5</span>
                  </div>
                </div>
                
                <div class="stock-section">
                  <h6>Disponibilidad</h6>
                  <span :class="product.stock > 0 ? 'text-success' : 'text-danger'">
                    <i :class="product.stock > 0 ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                    {{ product.stock > 0 ? `${product.stock} unidades disponibles` : 'Producto agotado' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between align-items-center w-100">
              <div>
                <span class="current-price fs-4">${{ product.price }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price ms-2">
                  ${{ product.originalPrice }}
                </span>
              </div>
              <button 
                class="btn btn-primary" 
                @click="addToCart(product)"
                :disabled="product.stock <= 0"
              >
                <i class="fas fa-shopping-cart me-1"></i>
                {{ product.stock > 0 ? 'Agregar al carrito' : 'Agotado' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover:not(.modal-active) {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Desactivar hover cuando el modal está activo */
.product-card.modal-active {
  pointer-events: auto;
  transform: none !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
}

.product-card.modal-active .product-image img {
  transform: none !important;
}

.product-card.modal-active .product-overlay {
  opacity: 0 !important;
  pointer-events: none !important;
}

.product-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover:not(.modal-active) .product-image img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.product-overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.product-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  margin-right: 0.5rem;
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
}

.product-features {
  margin-bottom: 1rem;
}

.feature-tag {
  display: inline-block;
  background: #f8f9fa;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
}

.product-price {
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

.product-stock {
  margin-bottom: 1rem;
}

.in-stock {
  color: #28a745;
  font-size: 0.9rem;
}

.out-of-stock {
  color: #dc3545;
  font-size: 0.9rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  margin-bottom: 0.5rem;
}

.rating-section, .stock-section {
  margin-top: 1rem;
}

/* Transiciones del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .product-info {
    padding: 1rem;
  }
  
  .product-title {
    font-size: 1rem;
  }

  .modal-overlay {
    padding: 10px;
  }
  
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>