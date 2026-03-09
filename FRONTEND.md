# Frontend — Cafetería Ebenezer

Aplicación web moderna y responsive para gestionar pedidos y reseñas en tiempo real.

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias (si no lo hasido)
npm install

# 2. Iniciar el servidor (desde la raíz del proyecto)
npm start

# 3. Abrir en navegador
http://localhost:3000
```

**Nota:** El servidor debe estar corriendo en puerto `3000` para que todo funcione correctamente.

## 📋 Tecnología

| Componente | Tecnología | Detalles |
|---|---|---|
| **Estructura** | HTML5 Semántico | Accesible, SEO-friendly |
| **Estilos** | CSS3 Moderno | Variables CSS, Grid/Flexbox, responsive |
| **Interactividad** | Vanilla JavaScript | Sin dependencias, fetch API |
| **Backend** | Node.js + Express | API REST en `/api` |
| **Comunicación** | Fetch API | JSON, CORS configurado |

## 🎨 Estructura de Secciones

### Hero / Landing
- **Propósito:** Primera impresión del negocio
- **Elementos:** Título principal, descripción, CTA buttons, estadísticas
- **Responsive:** Imagen visible en desktop, colapsada en mobile

### Menú
- **Propósito:** Mostrar especialidades de la cafetería
- **Contenido:** 3 cards con imagen, nombre, descripción
- **Interactividad:** Hover con levantamiento y zoom de imagen
- **CTA:** Link a sección de pedidos

### Nosotros
- **Propósito:** Contar la historia de la marca
- **Layout:** Imagen + texto (swapped en mobile)
- **Elementos:** Galería de 3 fotos, párrafos descriptivos
- **Visual:** Fondo oscuro (contraste), texto claro

### Opiniones / Reviews
- **Propósito:** Mostrar testimonios de clientes
- **Contenido:** Cards autónomos con estrellas, texto, avatar
- **Dinámico:** Formulario integrado para agregar opiniones
- **Estado:** Opiniones comienzan en "pendiente", se publican manualmente

### Formulario de Pedidos
- **Campos:** Nombre, teléfono, producto, cantidad, notas opcionales
- **Validación:** HTML5 required, cantidad (1-20)
- **Envío:** POST a `/api/pedidos`
- **Respuesta:** Mensaje de éxito/error en pantalla
- **UX:** Botón cambia estado durante envío

### Formulario de Opiniones
- **Campos:** Nombre, ciudad (opcional), opinión
- **Validación:** Nombre y opinión requeridos
- **Envío:** POST a `/api/resenas`
- **Estado:** Comienza en "pendiente", requiere aprobación
- **Visual:** Calificación fija en 5 estrellas (mejorable)

### Ubicación / Mapa
- **Mapa:** Google Maps embed (Madrid)
- **Contacto:** Teléfono, email, direcciónDetalle
- **Responsive:** Altura ajustada según viewport

### Footer
- **Secciones:** Branding, navegación, contacto
- **Links:** Internos y externos (tel:, mailto:)
- **Año:** Actualizar a 2025-2026

## 🔗 Integración con Backend

### Detección de Entorno

El frontend detecta automáticamente si se ejecuta en desarrollo o producción:

```javascript
const apiUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api/pedidos'
  : '/api/pedidos';
```

**Desarrollo:** Usa `http://localhost:3000` directamente  
**Producción:** Usa rutas relativas `/api/...` (a través del proxy de Hostinger)

### Endpoints Utilizados

| Método | Endpoint | Propósito |
|---|---|---|
| `POST` | `/api/pedidos` | Crear nuevo pedido |
| `GET` | `/api/pedidos` | Listar pedidos (todos los estados) |
| `POST` | `/api/resenas` | Crear nueva opinión |
| `GET` | `/api/resenas` | Listar opiniones publicadas |
| `GET` | `/api/resenas?all=true` | Listar todas (admin) |

### Manejo de Errores

Ambos formularios capturan y muestran errores:

```javascript
catch (error) {
  msg.className = 'err';
  msg.textContent = '❌ ' + error.message;
}
```

**Estilos de respuesta:**
- `.ok` → Verde (éxito)
- `.err` → Rojo (error)

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Página de inicio con diseño profesional
- [x] Componentes responsivos (móvil, tablet, desktop)
- [x] Formulario de pedidos con validación
- [x] Formulario de opiniones con validación
- [x] Integración con API backend
- [x] Detección de entorno (dev/prod)
- [x] Navegación móvil con hamburguesa
- [x] Animaciones smooth scroll y reveal
- [x] Ticker animado con especialidades
- [x] Contacto directo (tel, email)

### 🔜 Pendientes (Mejoras)
- [ ] Autenticación admin (JWT)
- [ ] Panel administrativo para gestionar pedidos/opiniones
- [ ] Carrito de compras (múltiples artículos)
- [ ] Sistema de notificaciones en tiempo real (WebSockets)
- [ ] Carga de imágenes custom (cloudinary/storage)
- [ ] Estadísticas y analytics
- [ ] Página de menu completo (con precios, disponibilidad)
- [ ] Sistema de promociones/cupones
- [ ] Integración de pagos (Stripe/TPV)
- [ ] PWA (Progressive Web App)
- [ ] Blog/recetas

## 🧪 Testing Manual

### Flujo 1: Crear Pedido

```bash
# Terminal 1: Servidor corriendo
npm start

# Terminal 2: Verificar que GET inicial devuelve array vacío
curl http://localhost:3000/api/pedidos

# Navegador: http://localhost:3000
# 1. Scroll a "Haz tu pedido"
# 2. Llenar formulario:
#    - Nombre: "Juan"
#    - Teléfono: "+34 600 123 456"
#    - Producto: "Bocadillo Cubano"
#    - Cantidad: 2
#    - Notas: "Sin picante"
# 3. Click en "Enviar Pedido →"
# 4. Debe mostrar: "✅ ¡Pedido enviado! Te confirmamos en breve por teléfono."

# Terminal 2: Verificar que el pedido se guardó
curl http://localhost:3000/api/pedidos | jq .
```

### Flujo 2: Crear Opinión

```bash
# Navegador: http://localhost:3000
# 1. Scroll a "Deja tu opinión"
# 2. Llenar formulario:
#    - Nombre: "Marina"
#    - Ciudad: "Madrid"
#    - Tu opinión: "¡Excelente experiencia! Muy recomendado."
# 3. Click en "Enviar Opinión →"
# 4. Debe mostrar: "✅ ¡Gracias por tu opinión, Marina!"

# Terminal 2: Ver opinión (pendiente de publicación)
curl "http://localhost:3000/api/resenas?all=true" | jq .
```

### Flujo 3: Responsive Design

```bash
# Navegador: Abrir DevTools (F12)
# 1. Cambiar a móvil (iPhone 12): 390px ancho
# 2. Verificar que:
#    - Menú hamburguesa aparece
#    - Imágenes se adaptan
#    - Formularios son legibles
#    - Footer es vertical
# 3. Expandir a tablet (768px)
# 4. Expandir a desktop (1920px)
```

### Flujo 4: Validación

```bash
# Navegador: http://localhost:3000
# 1. Intenta enviar formulario vacío
# 2. Debe mostrar: "Please fill out this field."
# 3. Intenta con teléfono vacío
# 4. Intenta con cantidad > 20
# 5. Cantidad mínima es 1
```

## 🔧 Desarrollo / Customización

### Cambiar Colores

Edita `/public/index.html` - sección `:root`:

```css
:root {
  --bg:       #FDF0E0;      /* Fondo principal */
  --orange:   #C8651A;      /* Color primario */
  --brown:    #2C1A0E;      /* Color secundario */
  --white:    #ffffff;
  --radius:   10px;         /* Border radius */
}
```

### Cambiar Productos

Edita el `<select>` en el formulario de pedidos:

```html
<select id="producto" name="producto" required>
  <option value="">— Selecciona —</option>
  <option value="bocadillo-cubano">Bocadillo Cubano</option>
  <option value="pizza">Pizza Artesana</option>
  <!-- Agregar más opciones aquí -->
</select>
```

### Agregar Nuevas Secciones

1. Copia HTML de una sección existente
2. Actualiza IDs, clases y contenido
3. Agrega link en navegación
4. Ajusta responsive breakpoints si es necesario

## 📱 Respuestas de API Esperadas

### POST /api/pedidos

**Petición:**
```json
{
  "nombre": "Juan",
  "telefono": "+34600123456",
  "producto": "bocadillo-cubano",
  "cantidad": 1,
  "notas": "Sin picante"
}
```

**Respuesta (200):**
```json
{
  "error": false,
  "message": "Pedido creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan",
    "telefono": "+34600123456",
    "producto": "bocadillo-cubano",
    "cantidad": 1,
    "notas": "Sin picante",
    "estado": "pendiente",
    "fechaCreacion": "2026-03-09T10:00:00.000Z",
    "fechaActualizacion": "2026-03-09T10:00:00.000Z"
  }
}
```

### POST /api/resenas

**Petición:**
```json
{
  "nombre": "Marina",
  "ciudad": "Madrid",
  "texto": "¡Excelente!"
}
```

**Respuesta (200):**
```json
{
  "error": false,
  "message": "Reseña creada exitosamente",
  "data": {
    "id": 1,
    "nombre": "Marina",
    "ciudad": "Madrid",
    "texto": "¡Excelente!",
    "calificacion": 5,
    "estado": "pendiente",
    "fechaCreacion": "2026-03-09T10:00:00.000Z"
  }
}
```

## 🚀 Despliegue a Producción

Ver [HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md) para instrucciones completas.

**Resumen:**
1. Push a GitHub: `git push`
2. Hostinger ejecuta GitHub Actions (CI/CD)
3. Deploy automático a `https://cafeteriaebenezer.site`
4. El frontend se sirve desde `public/`
5. Los formularios apuntan a `/api/...` (proxy de Hostinger)

## 📖 Documentación Relacionada

- [README.md](./README.md) — Visión general del proyecto
- [API.md](./API.md) — Documentación de endpoints
- [BACKEND_AUDIT.md](./BACKEND_AUDIT.md) — Estado del backend
- [HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md) — Instrucciones de deploy

## 👥 Soporte

**Problemas comunes:**

| Problema | Solución |
|---|---|
| "Cannot POST /api/pedidos" | Backend no está corriendo. Ejecutar `npm start` |
| Formularios no envían datos | Verificar console de DevTools (F12 → Console) |
| Página se ve fea en móvil | Limpiar cache del navegador (Ctrl+Shift+R) |
| Endpoint devuelve 429 | Rate limiting. Esperar 15 minutos o reiniciar |

## 📝 Notas Importantes

- **No guardes credenciales** en el frontend
- **CORS está configurado** para localhost y producción
- **Rate limiting** activo: 100 req/15min general, 10 pedidos/min
- **Validación** en cliente Y servidor (nunca confiar solo en cliente)
- **SSL/TLS** activo en producción (Hostinger)

---

**Última actualización:** 2026-03-09  
**Versión:** 1.0 (MVP)  
**Autor:** Cafetería Ebenezer Dev Team
