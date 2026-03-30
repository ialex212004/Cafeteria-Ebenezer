# ☕ Cafetería Ebenezer — Plataforma Web Profesional

Sistema completo de gestión de pedidos y reseñas para Cafetería Ebenezer. Backend robusto en Node.js/Express con validación, logging, rate limiting y arquitectura escalable.

## 📁 Estructura del Proyecto

```
cafeteria-ebenezer/
├── src/                          # Código fuente
│   ├── config/                   # Configuración centralizada
│   ├── middleware/               # Middlewares (validación, seguridad, logging)
│   ├── routes/                   # Rutas de API
│   ├── utils/                    # Utilidades (logger, data manager)
│   └── validators/               # Esquemas de validación
├── data/                         # Datos (JSON) - NO hacer commit
├── public/                       # Frontend (HTML/CSS/JS estático)
├── logs/                         # Archivos de log - NO hacer commit
├── server.js                     # Punto de entrada del servidor
├── package.json                  # Dependencias y scripts
├── private/.env.example          # Plantilla de variables de entorno (privado)
├── .gitignore                    # Archivos ignorados en Git
├── .editorconfig                 # Configuración de editor
└── LICENSE                       # Licencia MIT
```

## 🚀 Instalación Local

### Requisitos
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ialex212004/Cafeteria-Ebenezer.git
   cd Cafeteria-Ebenezer
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp private/.env.example .env
   # Edita .env con tus valores
   ```

4. **Iniciar servidor (desarrollo)**
   ```bash
   npm run dev
   ```

5. **Servidor está disponible en**
   ```
   http://localhost:3000
   ```

## 📦 Scripts Disponibles

```bash
npm start          # Inicia servidor en producción
npm run dev        # Inicia servidor en desarrollo (NODE_ENV=development)
npm run test       # Ejecuta tests (cuando estén implementados)
npm run lint       # Valida código (ESLint)
npm run format     # Formatea código (Prettier)
npm run validate   # Ejecuta lint + tests
npm run logs:clear # Limpia archivos de log
```

## 🔌 API Endpoints

### Salud del Servidor
```
GET  /api/health              # Verificar estado del servidor
GET  /api                     # Información del API
```

### Pedidos
```
POST   /api/pedidos           # Crear nuevo pedido
GET    /api/pedidos           # Obtener todos los pedidos
GET    /api/pedidos/:id       # Obtener pedido específico
PATCH  /api/pedidos/:id       # Actualizar estado del pedido
DELETE /api/pedidos/:id       # Eliminar pedido
```

#### Crear Pedido (POST /api/pedidos)
```json
{
  "nombre": "Juan Pérez",
  "telefono": "+34 123 456 789",
  "producto": "Bocadillo Cubano",
  "cantidad": 2,
  "notas": "Sin mayonesa"
}
```

**Estados válidos**: `pendiente`, `confirmado`, `entregado`

### Reseñas
```
POST   /api/resenas           # Crear nueva reseña
GET    /api/resenas           # Obtener reseñas publicadas
GET    /api/resenas/todas     # Obtener TODAS las reseñas (admin)
GET    /api/resenas/:id       # Obtener reseña específica
PATCH  /api/resenas/:id       # Cambiar estado (publicar/rechazar)
DELETE /api/resenas/:id       # Eliminar reseña
```

#### Crear Reseña (POST /api/resenas)
```json
{
  "nombre": "María López",
  "ciudad": "Madrid",
  "texto": "Los bocadillos son deliciosos. Recomiendo mucho esta cafetería."
}
```

**Estados de reseña**: `pendiente`, `publicada`, `rechazada`

## ⚙️ Configuración

### Variables de Entorno (.env)

Las plantillas de variables de entorno ahora se encuentran en la carpeta `/private`.

```env
# Servidor
NODE_ENV=production
PORT=3000

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://cafeteria-ebenezer.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_DIR=./logs

# Seguridad
JWT_SECRET=tu_super_secreto_min_32_caracteres
API_KEY=tu_api_key
```

## 🔒 Características de Seguridad

- ✅ **CORS configurado**: Solo dominios permitidos
- ✅ **Rate Limiting**: Protección contra abuso
- ✅ **Headers de Seguridad**: CSP, X-Frame-Options, HSTS (prod)
- ✅ **Validación de Entrada**: Con Joi (tipos, longitud, formato)
- ✅ **Manejo de Errores**: Centralizado y seguro
- ✅ **Logging**: Auditoría completa en producción

## 📊 Límites y Validaciones

| Campo | Límite | Validación |
|-------|--------|-----------|
| Nombre | 100 caracteres | Requerido, no vacío |
| Teléfono | 20 caracteres | Requerido, formato de teléfono |
| Producto | 200 caracteres | Requerido, no vacío |
| Cantidad | 1-100 | Número entero |
| Notas | 500 caracteres | Opcional |
| Reseña | 1000 caracteres | Requerido, mín 5 caracteres |
| Ciudad | 100 caracteres | Opcional |

## 📝 Logging

Los logs se generan en `/logs` (solo en producción):
- `error.YYYY-MM-DD.log` - Errores
- `warn.YYYY-MM-DD.log` - Advertencias
- `info.YYYY-MM-DD.log` - Información general

En desarrollo, los logs aparecen en consola con colores.

## 🌐 Despliegue en Hostinger

### Opción 1: Node.js en Hostinger
1. Conecta el repositorio GitHub a Hostinger
2. Configura variables de entorno en panel
3. Establece comando build: `npm install`
4. Establece comando start: `npm start`

### Opción 2: Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Próximos Pasos (Roadmap)

- [ ] Autenticación/Autorización (JWT)
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Dashboard de administración
- [ ] Notificaciones por email
- [ ] Tests automatizados (Jest)
- [ ] API Documentation (Swagger/OpenAPI)
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Docker Compose setup

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Para consultas o soporte, contacta a: **admin@cafeteria-ebenezer.com**

---

**Última actualización**: Marzo 2026
- **Startup file:** `server.js`
- **Node.js version:** 18 o superior

### 3. Instalar dependencias
En la terminal de Hostinger:
```bash
npm install
```

### 4. Activar la URL de producción
En `public/index.html`, busca estas dos líneas y actualiza la URL:
```js
// Línea ~220 — formulario de pedido:
const res = await fetch('https://cafeteriaebenezer.site/api/pedido', ...)

// Línea ~255 — formulario de reseña:
const res = await fetch('https://cafeteriaebenezer.site/api/resena', ...)
```

### 5. Reiniciar la app
En el panel Hostinger → Node.js → **Restart**

---

## 🔌 Endpoints de la API

| Método   | Ruta              | Descripción                        |
|----------|-------------------|------------------------------------|
| `POST`   | `/api/pedido`     | Crear nuevo pedido                 |
| `GET`    | `/api/pedidos`    | Listar todos los pedidos           |
| `PATCH`  | `/api/pedido/:id` | Actualizar estado del pedido       |
| `DELETE` | `/api/pedido/:id` | Eliminar un pedido                 |
| `POST`   | `/api/resena`     | Guardar nueva reseña               |
| `GET`    | `/api/resenas`    | Listar todas las reseñas           |
| `DELETE` | `/api/resena/:id` | Eliminar una reseña                |

### Ejemplo — crear pedido
```json
POST /api/pedido
{
  "nombre": "María García",
  "telefono": "+34 600 000 000",
  "producto": "bocadillo-cubano",
  "cantidad": 2,
  "notas": "Sin cebolla"
}
```

### Ejemplo — actualizar estado
```json
PATCH /api/pedido/1700000000000
{
  "estado": "confirmado"
}
```
Estados válidos: `pendiente` | `confirmado` | `entregado`

---

## 📞 Contacto

- **Web:** cafeteriaebenezer.site  
- **Tel:** +34 623 272 728  
- **Email:** info@cafeteriaebenezer.com
