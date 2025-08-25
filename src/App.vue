<script setup>
  import Nav from './components/nav.vue'
</script>

<template>
  <div id="app">
    <Nav />
    <main style="min-height: calc(100vh - 200px);">
      <RouterView></RouterView>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4">
            <h5 class="fw-bold mb-3">
              <i class="fas fa-gamepad me-2"></i>
              GameStore
            </h5>
            <p class="text-muted">
              Tu tienda de confianza para consolas, videojuegos y accesorios gaming. 
              Ofrecemos los mejores productos al mejor precio con garantía de calidad.
            </p>
            <div class="social-links">
              <a href="#" class="me-3"><i class="fab fa-facebook"></i></a>
              <a href="#" class="me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="me-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="me-3"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="fw-bold mb-3">Productos</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><RouterLink to="/consolas" class="text-muted text-decoration-none">Consolas</RouterLink></li>
              <li class="mb-2"><RouterLink to="/videojuegos" class="text-muted text-decoration-none">Videojuegos</RouterLink></li>
              <li class="mb-2"><RouterLink to="/accesorios" class="text-muted text-decoration-none">Accesorios</RouterLink></li>
              <li class="mb-2"><RouterLink to="/productos" class="text-muted text-decoration-none">Todos los Productos</RouterLink></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="fw-bold mb-3">Servicios</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Envío Gratis</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Garantía Extendida</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Soporte Técnico</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Devoluciones</a></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="fw-bold mb-3">Empresa</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Sobre Nosotros</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Trabaja con Nosotros</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Prensa</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Contacto</a></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-6 mb-4">
            <h6 class="fw-bold mb-3">Ayuda</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Centro de Ayuda</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Estado del Pedido</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Política de Privacidad</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        
        <hr class="my-4" style="border-color: rgba(255,255,255,0.1);">
        
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="text-muted mb-0">
              © 2024 GameStore. Todos los derechos reservados.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="payment-methods">
              <span class="text-muted me-3">Métodos de pago:</span>
              <i class="fab fa-cc-visa me-2"></i>
              <i class="fab fa-cc-mastercard me-2"></i>
              <i class="fab fa-cc-paypal me-2"></i>
              <i class="fab fa-bitcoin me-2"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.social-links a {
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #667eea;
}

.payment-methods i {
  font-size: 1.5rem;
  color: #95a5a6;
}

.payment-methods i:hover {
  color: #667eea;
}

.list-unstyled a:hover {
  color: #667eea !important;
}
</style>
