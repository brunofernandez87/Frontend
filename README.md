# 🌱 AgroInsumos E-Commerce (Frontend)

Frontend del e-commerce de insumos agrícolas **AgroInsumos**, construido con **React + TypeScript + Vite**. El proyecto ofrece una experiencia rápida, moderna y optimizada para que los usuarios puedan explorar, filtrar y comprar productos agropecuarios mediante una interfaz clara y responsiva.

---

## 📚 Tecnologías Utilizadas

- **React** + **TypeScript**
- **Vite**
- **React Router**
- **Axios** (*si aplica*)
- **CSS / SASS**
- **ESLint** (*configuración presente*)
- **Docker + Nginx** (*para despliegue*)

---

## 📁 Estructura del Proyecto

Basado en la estructura real del repositorio (`branch dev`):
```plaintext
C:.
|   .gitignore
|   eslint.config.js
|   index.html
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|   
+---public
|   |   vite.svg
|   |   
|   \---product_icons
|           1.jpeg
|           10.jpeg
|           11.jpeg
|           12.jpeg
|           13.jpeg
|           14.jpeg
|           15.jpeg
|           2.jpeg
|           3.jpeg
|           4.jpeg
|           5.jpeg
|           6.jpeg
|           7.jpeg
|           8.jpeg
|           9.jpeg
|
\---src
    |   App.css
    |   App.tsx
    |   index.css
    |   main.tsx
    |   routes.tsx
    |
    +---assets
    |   |   error.png
    |   |   Logo eccomerce.jpeg
    |   |   mockReporte.jpg
    |   |
    |   \---RedesSociales
    |           googleMaps.svg
    |           instagram-icon.svg
    |           linkedin.svg
    |           microsoft-outlook.svg
    |           whatsapp-icon.svg
    |
    +---components
    |   |   aboutUs.tsx
    |   |   adminGuard.tsx
    |   |   cart.tsx
    |   |   contact.tsx
    |   |   errorPage.tsx
    |   |   filterCategory.tsx
    |   |   home.tsx
    |   |
    |   +---footer
    |   |       footer.tsx
    |   |
    |   +---header
    |   |       header.tsx
    |   |
    |   +---order
    |   |       createOrder.tsx
    |   |       order.tsx
    |   |       orderDetail.tsx
    |   |
    |   +---product
    |   |       cardProduct.tsx
    |   |       cardProducts.tsx
    |   |       createProduct.tsx
    |   |       searchCategory.tsx
    |   |       selectProduct.tsx
    |   |
    |   +---report
    |   |       report.tsx
    |   |       reportsCard.tsx
    |   |
    |   \---user
    |           changePassword.tsx
    |           login.tsx
    |           modificateUser.tsx
    |           profile.tsx
    |           recovery.tsx
    |           register.tsx
    |           users.tsx
    |
    +---context
    |       cartContext.tsx
    |       orderDetailListContext.tsx
    |       orderListContext.tsx
    |       orderListFilterContext.tsx
    |       productFilterContext.tsx
    |       productListContext.tsx
    |       reportListContext.tsx
    |       reportListFilterContext.tsx
    |       userContext.tsx
    |       userListContext.tsx
    |       userListFilterContext.tsx
    |
    +---mock
    |       orderDetailMock.json
    |       orderMock.json
    |       productMock.json
    |       reportMock.json
    |       userMock.json
    |
    \---styles
        |   aboutUs.css
        |   cart.css
        |   contact.css
        |   errorPage.css
        |   footer.css
        |   header.css
        |   login.css
        |   profile.css
        |   recovery.css
        |   register.css
        |
        +---order
        |       order.css
        |       orderDetail.css
        |
        +---product
        |       cardProduct.css
        |       cardsproducts.css
        |       createProduct.css
        |
        +---report
        |       report.css
        |       reportsCard.css
        |
        \---user
                changePassword.css
                login.css
                modificateUser.css
                profile.css
                recovery.css
                register.css
                users.css
```
---

## 🚀 Instalación y Ejecución
```ruby
1️⃣ #Clonar el repositorio
git clone https://github.com/brunofernandez87/Eccomerce-Frontend.git
cd Eccomerce-Frontend

2️⃣ #Instalar dependencias
npm install

3️⃣ #Ejecutar el entorno de desarrollo
npm run dev

4️⃣ #Generar build de producción
npm run build

5️⃣ #Previsualizar la build (opcional)
npm run preview
```

## 🧪 Funcionalidades

- ✔️ Listado de productos

- ✔️ Vista detallada de productos

- ✔️ Carrito de compras

- ✔️ Filtros por categoría / tipo

- ✔️ Diseño 100% responsive


### ⏳ Comunicación con API externa (en proceso)

- ✔️ Checkout
- ✔️ Login / registro

### 📦 Scripts del Proyecto

**NGINX**
```ruby
# Inicia el servidor de desarrollo
npm run dev

# Compila para producción
npm run build

# Previsualiza la build
npm run preview
```

## 🐳 Despliegue con Docker
```bash
#Construir imagen
docker build -t agroinsumos-frontend .

#Ejecutar contenedor
docker run -d -p 80:80 agroinsumos-frontend

Esto servirá la aplicación con Nginx en el puerto 80.
```

🤝 Contribuciones
Las contribuciones son bienvenidas.

```ruby
Crear un fork del repositorio.
Crear una rama nueva:
git checkout -b feature/nueva-funcionalidad

Realizar los cambios y commitear:
git commit -m "feat: nueva funcionalidad"

Hacer push:
git push origin feature/nueva-funcionalidad
Abrir un Pull Request.
```

### 📈 Roadmap de Mejoras

- Integración completa de checkout y pasarela de pagos

- Optimización de imágenes

- Sistema de favoritos

- Integración CI/CD (GitHub Actions)

- Mejoras de accesibilidad

---

### 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Asegurate de incluir un archivo LICENSE en la raíz si aún no está presente.

---

### 👤 Colaboradores

Bruno Fernández - Ivo Depari - Eros Perrone - Franco Devaux

Repositorio: https://github.com/brunofernandez87/Eccomerce-Frontend

---

### 📝 Última Actualización
2025-11-30
