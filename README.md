# GameStore - Tienda de Consolas y Videojuegos

![GameStore](https://img.shields.io/badge/Vue.js-3.4.29-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.1.7-yellow?style=for-the-badge&logo=vue.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

## 📋 Descripción

GameStore es una aplicación web moderna desarrollada con Vue.js 3 que simula una tienda online completa de consolas, videojuegos y accesorios gaming. El proyecto está diseñado para demostrar habilidades de desarrollo frontend con un enfoque profesional y funcionalidades de e-commerce.

## ✨ Características Principales

### 🛍️ Funcionalidades de Tienda
- **Catálogo de Productos**: Consolas, videojuegos y accesorios gaming
- **Sistema de Carrito**: Añadir, remover y gestionar productos
- **Búsqueda y Filtros**: Búsqueda por nombre y filtrado por categorías
- **Ordenamiento**: Por precio, nombre y valoración
- **Gestión de Stock**: Control de inventario en tiempo real

### 🎨 Diseño y UX
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Interfaz Moderna**: Gradientes, animaciones y efectos hover
- **Navegación Intuitiva**: Menú fijo con categorías organizadas
- **Modales Interactivos**: Detalles de productos y carrito de compras

### 🔧 Tecnologías Implementadas
- **Vue.js 3**: Framework principal con Composition API
- **Pinia**: Gestión de estado centralizada
- **Vue Router**: Navegación SPA
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Font Awesome**: Iconografía profesional
- **Vue3-Toastify**: Notificaciones de usuario

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/game-store-vue.git
cd game-store-vue
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
game-store-vue/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css          # Estilos globales
│   ├── components/
│   │   ├── nav.vue           # Navegación principal
│   │   └── ProductCard.vue   # Componente de producto
│   ├── stores/
│   │   ├── cart.js           # Store del carrito
│   │   └── products.js       # Store de productos
│   ├── views/
│   │   ├── Home.vue          # Página de inicio
│   │   ├── Productos.vue     # Catálogo completo
│   │   ├── consolas.vue      # Página de consolas
│   │   ├── videojuegos.vue   # Página de videojuegos
│   │   └── accesorios.vue    # Página de accesorios
│   ├── routes/
│   │   └── router.js         # Configuración de rutas
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Funcionalidades Técnicas

### Gestión de Estado (Pinia)
- **Cart Store**: Manejo del carrito de compras
  - Añadir/remover productos
  - Actualizar cantidades
  - Calcular totales
  - Proceso de checkout

- **Products Store**: Gestión de productos
  - Catálogo de productos
  - Filtrado y búsqueda
  - Ordenamiento
  - Categorización

### Componentes Reutilizables
- **ProductCard**: Tarjeta de producto con modal de detalles
- **Nav**: Navegación con carrito integrado
- **Footer**: Información de la empresa y enlaces

### Rutas Implementadas
- `/` - Página de inicio con hero section
- `/productos` - Catálogo completo con filtros
- `/consolas` - Página específica de consolas
- `/videojuegos` - Página específica de videojuegos
- `/accesorios` - Página específica de accesorios

## 🎯 Características Destacadas

### Sistema de Carrito
- Persistencia de estado durante la sesión
- Cálculo automático de totales
- Gestión de cantidades
- Notificaciones de usuario
- Modal de carrito con detalles completos

### Búsqueda y Filtros
- Búsqueda en tiempo real
- Filtrado por categorías
- Ordenamiento múltiple
- Resultados dinámicos

### Diseño Profesional
- Paleta de colores moderna
- Animaciones suaves
- Efectos hover interactivos
- Tipografía profesional (Inter)
- Iconografía consistente

## 📱 Responsive Design

El proyecto está completamente optimizado para:
- **Móviles**: Navegación hamburguesa, cards adaptativas
- **Tablets**: Layout intermedio optimizado
- **Desktop**: Experiencia completa con sidebar y filtros

## 🔧 Personalización

### Modificar Productos
Edita `src/stores/products.js` para añadir, modificar o eliminar productos:

```javascript
{
  id: 1,
  name: 'Nuevo Producto',
  category: 'consolas',
  price: 299.99,
  originalPrice: 399.99,
  image: 'url-de-imagen',
  description: 'Descripción del producto',
  rating: 4.5,
  stock: 10,
  features: ['Característica 1', 'Característica 2']
}
```

### Cambiar Estilos
Modifica `src/assets/main.css` para personalizar:
- Colores principales
- Tipografía
- Animaciones
- Efectos hover

## 🚀 Despliegue

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

### Vercel
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones del CLI

## 📊 Métricas del Proyecto

- **Líneas de código**: ~2,500
- **Componentes**: 8
- **Páginas**: 5
- **Productos**: 10 (expandible)
- **Funcionalidades**: 15+

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- Vue.js Team por el excelente framework
- Bootstrap por el sistema de diseño
- Font Awesome por los iconos
- Unsplash por las imágenes de muestra

---

⭐ Si este proyecto te ha sido útil, ¡dale una estrella al repositorio!
