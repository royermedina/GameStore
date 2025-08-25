<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../stores/cart.js'
import { useProducts } from '../stores/products.js'

const { 
  items, 
  cartItemCount, 
  cartTotal, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  checkout 
} = useCart()

const { 
  setSearchQuery, 
  setSelectedCategory, 
  setSortBy 
} = useProducts()

const showCartModal = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  setSearchQuery(searchQuery.value)
}

const setCategory = (category) => {
  setSelectedCategory(category)
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-gamepad me-2"></i>
        GameStore
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos">Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/consolas">Consolas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/videojuegos">Videojuegos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/accesorios">Accesorios</router-link>
          </li>
        </ul>

        <!-- Barra de búsqueda -->
        <div class="d-flex me-3">
          <input 
            class="form-control me-2" 
            type="search" 
            placeholder="Buscar productos..."
            v-model="searchQuery"
            @input="handleSearch"
          >
        </div>

        <!-- Dropdown de ordenamiento -->
        <div class="dropdown me-3">
          <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-sort me-1"></i>
            Ordenar
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="setSortBy('name')">Por nombre</a></li>
            <li><a class="dropdown-item" href="#" @click="setSortBy('price-asc')">Precio: menor a mayor</a></li>
            <li><a class="dropdown-item" href="#" @click="setSortBy('price-desc')">Precio: mayor a menor</a></li>
            <li><a class="dropdown-item" href="#" @click="setSortBy('rating')">Por calificación</a></li>
          </ul>
        </div>

        <!-- Dropdown de categorías -->
        <div class="dropdown me-3">
          <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-filter me-1"></i>
            Categorías
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="setCategory('')">Todas</a></li>
            <li><a class="dropdown-item" href="#" @click="setCategory('consolas')">Consolas</a></li>
            <li><a class="dropdown-item" href="#" @click="setCategory('videojuegos')">Videojuegos</a></li>
            <li><a class="dropdown-item" href="#" @click="setCategory('accesorios')">Accesorios</a></li>
          </ul>
        </div>

        <!-- Botón del carrito -->
        <button class="btn btn-primary position-relative" @click="showCartModal = true">
          <i class="fas fa-shopping-cart"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" v-if="cartItemCount > 0">
            {{ cartItemCount }}
          </span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Modal del carrito -->
  <div class="modal fade" id="cartModal" tabindex="-1" :class="{ show: showCartModal }" v-if="showCartModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fas fa-shopping-cart me-2"></i>
            Carrito de Compras
          </h5>
          <button type="button" class="btn-close" @click="showCartModal = false"></button>
        </div>
        <div class="modal-body">
          <div v-if="items.length === 0" class="text-center py-4">
            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <p class="text-muted">Tu carrito está vacío</p>
          </div>
          <div v-else>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img :src="item.image" :alt="item.name" class="cart-item-image me-2">
                        <div>
                          <h6 class="mb-0">{{ item.name }}</h6>
                          <small class="text-muted">{{ item.category }}</small>
                        </div>
                      </div>
                    </td>
                    <td>${{ item.price }}</td>
                    <td>
                      <div class="input-group input-group-sm" style="width: 120px;">
                        <button class="btn btn-outline-secondary" @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                        <input type="number" class="form-control text-center" v-model="item.quantity" @change="updateQuantity(item.id, item.quantity)" min="1">
                        <button class="btn btn-outline-secondary" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                      </div>
                    </td>
                    <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="items.length > 0">
          <div class="d-flex justify-content-between align-items-center w-100">
            <div>
              <button class="btn btn-outline-secondary" @click="clearCart">
                <i class="fas fa-trash me-1"></i>
                Vaciar carrito
              </button>
            </div>
            <div class="text-end">
              <h5 class="mb-0">Total: ${{ cartTotal.toFixed(2) }}</h5>
              <button class="btn btn-success mt-2" @click="checkout">
                <i class="fas fa-credit-card me-1"></i>
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay del modal -->
  <div class="modal-backdrop fade show" v-if="showCartModal" @click="showCartModal = false"></div>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.cart-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.modal {
  display: block;
}

.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}

@media (max-width: 768px) {
  .navbar-nav {
    margin-bottom: 1rem;
  }
  
  .d-flex {
    margin-bottom: 1rem;
  }
}
</style>