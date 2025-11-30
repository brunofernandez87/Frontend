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
Eccomerce-Frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # imágenes, SVGs y archivos estáticos
│ ├── components/ # componentes reutilizables
│ ├── pages/ # páginas principales del sitio
│ ├── routes/ # configuración de rutas
│ ├── services/ # comunicación con API (fetch/axios)
│ ├── store/ # estado global (Context, Zustand, Redux, etc.)
│ ├── styles/ # estilos globales / parciales
│ └── utils/ # helpers y utilidades
├── .gitignore
├── .dockerignore
├── Dockerfile # preparación para despliegue con Nginx
├── nginx.conf # configuración de Nginx
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── package.json
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
2025-11-23
