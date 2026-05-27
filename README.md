# 🛍️ E-Commerce de Ropa — Proyecto JS + CSS + HTML

**Autor:** Juan Santiago Lagos Jaimes  
**Curso:** C3  

---

## 📋 Descripción

Aplicación web de e-commerce para una tienda de ropa, construida con HTML, CSS y JavaScript vanilla. Permite a clientes explorar y comprar productos, y a un administrador gestionar categorías, productos y pedidos. Toda la información se persiste en `localStorage`, sin necesidad de backend ni base de datos.

---

## 🗂️ Estructura de carpetas

```
📦 proyecto-ecommerce/
│
├── index.html                  # Vista principal del cliente (tienda)
│
├── 📁 pages/
│   ├── loggin.html             # Login del administrador
│   ├── admin.html              # Dashboard del administrador
│   ├── categorias.html         # Módulo de categorías
│   ├── productos.html          # Módulo de productos
│   ├── pedidos.html            # Módulo de pedidos
│   ├── carrito.html            # Carrito de compras del cliente
│   └── product-detail.html     # Vista de detalle de un producto
│
├── 📁 css/
│   ├── style.css               # Estilos de la tienda (index)
│   ├── components.css          # Estilos de tarjetas de producto y filtros
│   ├── admin.css               # Estilos del login
│   ├── ecommerce.css           # Estilos del dashboard admin
│   ├── categorias.css          # Estilos del módulo de categorías
│   ├── productos.css           # Estilos del módulo de productos
│   ├── pedidos.css             # Estilos del módulo de pedidos
│   ├── carrito.css             # Estilos del carrito de compras
│   └── product-detail.css      # Estilos de la vista de detalle
│
├── 📁 js/
│   ├── storage.js              # Funciones genéricas de localStorage (CRUD)
│   ├── auth.js                 # Lógica de autenticación (login)
│   ├── admin.js                # Verificación de sesión y logout
│   ├── categories.js           # Lógica del módulo de categorías
│   ├── products.js             # Lógica del módulo de productos
│   ├── orders.js               # Lógica del módulo de pedidos
│   ├── cart.js                 # Lógica del carrito de compras
│   ├── index.js                # Lógica de la tienda (catálogo + filtros)
│   ├── product-detail.js       # Lógica de la vista de detalle de producto
│   │
│   └── 📁 components/
│       └── product-card.js     # Componente de tarjeta de producto
│
└── 📁 image/
    ├── fondo.jpeg
    ├── armario.jpg
    ├── still-life-with-classic-shirts.jpg
    └── empty-storage-space-filled-with-stacks-merchandise-goods.jpg
```

---

## 🚀 Cómo usar la aplicación

### Requisitos
No necesita instalación. Solo necesitas un servidor local para servir los archivos (por ejemplo, la extensión **Live Server** de VS Code o cualquier servidor HTTP estático).

### Iniciar
1. Clona o descarga el repositorio.
2. Abre el proyecto en VS Code.
3. Haz clic derecho en `index.html` → **Open with Live Server**.
4. La tienda se abrirá en tu navegador.

---

## 👤 Flujo del Cliente

### 1. Tienda — `index.html`
- Se muestran todos los productos disponibles en tarjetas.
- Usa el **buscador** para filtrar por nombre o descripción.
- Usa el **selector de categorías** para filtrar por categoría.
- Haz clic en una tarjeta para ver el detalle del producto.
- Haz clic en **"Agregar al carrito"** para añadir productos.

### 2. Detalle del producto — `product-detail.html`
- Muestra la imagen ampliada, nombre, código, categoría, descripción y precio.
- Botón para **agregar al carrito** con mensaje de confirmación.
- Flecha para volver al catálogo.

### 3. Carrito — `carrito.html`
- Lista los productos seleccionados con imagen, nombre, precio unitario y subtotal.
- Botones **`+`** y **`-`** para ajustar cantidades. Si la cantidad llega a 0, el producto se elimina.
- Muestra el **total** de la compra en tiempo real.
- Botón **"COMPRAR"** abre el formulario de pedido.
- El formulario valida:
  - Identificación: entre 6 y 12 dígitos numéricos.
  - Nombre: solo letras, mínimo 3 caracteres.
  - Dirección: mínimo 5 caracteres.
  - Teléfono: exactamente 10 dígitos.
  - E-mail: formato válido.
- Al confirmar, el pedido se guarda y el carrito se vacía.

---

## 🔐 Flujo del Administrador

### Credenciales de acceso
| Campo    | Valor              |
|----------|--------------------|
| Email    | admin@mail.com     |
| Contraseña | 123456           |

### 1. Login — `loggin.html`
- Ingresa el email y la contraseña.
- Si son correctos, se guarda la sesión en `localStorage` y se redirige al dashboard.
- Si son incorrectos, se muestra una alerta de acceso denegado.

### 2. Dashboard — `admin.html`
- Menú principal con acceso a los tres módulos: **Categorías**, **Productos** y **Pedidos**.
- El botón **LOG OUT** elimina la sesión y redirige al login.
- Todas las páginas del admin verifican la sesión automáticamente cada 3 segundos; si no hay sesión activa, redirigen al login.

### 3. Módulo Categorías — `categorias.html`
- Lista todas las categorías guardadas.
- **Agregar:** clic en "AGREGAR CATEGORÍA" → se abre un modal con campos de nombre y descripción → guardar.
- **Editar:** clic en "Editar" en la tarjeta → el modal se abre con los datos actuales → modificar y guardar.
- **Eliminar:** clic en "Eliminar" → se elimina directamente de la lista.

### 4. Módulo Productos — `productos.html`
- Lista todos los productos registrados con imagen, nombre, código, precio y descripción.
- **Agregar:** clic en "AGREGAR PRODUCTO" → modal con campos: código, nombre, categoría (cargada desde las categorías existentes), precio, URL de imagen y descripción.
- **Editar:** clic en "Editar" → modal con datos del producto → modificar y guardar.
- **Eliminar:** clic en "Eliminar" → se borra el producto.

### 5. Módulo Pedidos — `pedidos.html`
- Lista todos los pedidos ordenados del más reciente al más antiguo.
- Muestra por pedido: nombre, identificación, dirección, teléfono, e-mail, fecha y total.
- Botón **"VER MAS"** abre un modal con el detalle completo de cada producto comprado (imagen, nombre, categoría, precio unitario, cantidad y subtotal).

---

## 🗄️ Almacenamiento en localStorage

| Clave        | Contenido                                      |
|--------------|------------------------------------------------|
| `sesion`     | Objeto `{ activa: true }` cuando hay sesión    |
| `categorias` | Array de objetos `{ id, nombre, descripcion }` |
| `productos`  | Array de objetos `{ id, codigo, nom, categoria, precio, imagen, descrp }` |
| `carrito`    | Array de productos con campo extra `cantidad`  |
| `pedido`     | Array de órdenes con datos del cliente, fecha y productos |

---

## ⚙️ Módulos JavaScript

| Archivo | Responsabilidad |
|---|---|
| `storage.js` | CRUD genérico sobre `localStorage`: `obtenerTodos`, `agregarItem`, `actualizarItem`, `eliminarItem`, `agregarAlcarrito` |
| `auth.js` | Valida credenciales y guarda/destruye la sesión |
| `admin.js` | Protege las rutas admin verificando sesión; maneja el logout |
| `categories.js` | CRUD completo de categorías con modal |
| `products.js` | CRUD completo de productos con modal y carga dinámica de categorías |
| `orders.js` | Muestra pedidos ordenados por fecha y detalle en modal |
| `cart.js` | Gestión del carrito: cantidades, total, formulario de compra y validaciones |
| `index.js` | Renderiza el catálogo con filtros de búsqueda y categoría |
| `product-detail.js` | Carga el detalle de un producto por `id` desde la URL (`?id=...`) |
| `components/product-card.js` | Función que genera el HTML de una tarjeta de producto |