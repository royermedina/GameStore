import { reactive, computed } from 'vue'

// Estado global del carrito
const cartState = reactive({
  items: [],
  total: 0
})

// Funciones para manejar el carrito
export const useCart = () => {
  const cartItemCount = computed(() => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const addToCart = (product) => {
    const existingItem = cartState.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartState.items.push({
        ...product,
        quantity: 1
      })
    }
    
    // Mostrar notificación simple
    alert(`¡${product.name} agregado al carrito!`)
  }

  const removeFromCart = (productId) => {
    const index = cartState.items.findIndex(item => item.id === productId)
    if (index > -1) {
      cartState.items.splice(index, 1)
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = cartState.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    cartState.items = []
  }

  const checkout = () => {
    if (cartState.items.length === 0) {
      alert('El carrito está vacío')
      return
    }
    
    alert('¡Compra realizada con éxito! Gracias por tu compra.')
    clearCart()
  }

  return {
    items: computed(() => cartState.items),
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout
  }
}
