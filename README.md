# ☕ Cafetería Ebenezer — Web + Backend

Sitio web completo con backend Node.js/Express para Cafetería Ebenezer.

## 📁 Estructura del repositorio

```
cafeteria-ebenezer/
├── server.js          ← Backend (Node.js + Express)
├── package.json       ← Dependencias
├── public/
│   └── index.html     ← Frontend (página web completa)
└── data/
    ├── pedidos.json   ← Se llena automáticamente
    └── resenas.json   ← Se llena automáticamente
```

---

## 🚀 Despliegue en Hostinger (paso a paso)

### 1. Subir a GitHub
- Ve a [github.com/new](https://github.com/new)
- Nombre del repo: `cafeteria-ebenezer`
- Sube todos estos archivos manteniendo la estructura de carpetas

### 2. Conectar con Hostinger
- Panel Hostinger → **Node.js** → **Importa un repositorio Git**
- Haz clic en **Conéctate con GitHub**
- Selecciona el repositorio `cafeteria-ebenezer`
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
