# 🧪 Testing Guide — Cafetería Ebenezer

Guía completa para probar todos los componentes del sistema (backend + frontend).

## ✅ Pre-requisitos

```bash
# 1. Estar en la raíz del proyecto
cd /workspaces/Cafeteria-Ebenezer

# 2. Dependencias instaladas
npm install

# 3. Limpiar datos previos (opcional)
echo "[]" > data/pedidos.json
echo "[]" > data/resenas.json

# 4. Iniciar servidor
npm start
# Debería ver: [INFO] Servidor escuchando en http://localhost:3000
```

## 🔍 Test 1: Servidor Cargando

**Objetivo:** Verificar que el servidor se inicia correctamente

```bash
# En otra terminal
curl -i http://localhost:3000/

# Esperado:
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
# (seguido de HTML de index.html)
```

## 🔍 Test 2: Página Principal

**Objetivo:** Verificar que index.html se sirve

```bash
curl -s http://localhost:3000/ | grep -c "<!DOCTYPE html"
# Esperado: 1

curl -s http://localhost:3000/ | grep -c "Cafetería Ebenezer"
# Esperado: 1+ (múltiples menciones)
```

## 🔍 Test 3: Health Check

**Objetivo:** Verificar que el servidor está healthy

```bash
curl -s http://localhost:3000/health | jq .

# Esperado:
# {
#   "status": "OK",
#   "server": "Cafetería Ebenezer API v1.0",
#   "uptime": <number>,
#   "timestamp": "2026-03-09T09:56:40.165Z"
# }
```

## 🔍 Test 4: API Pedidos - Crear (POST)

**Objetivo:** Validar creación de pedidos

### Caso 4a: Pedido Válido

```bash
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "telefono": "+34 600 123 456",
    "producto": "bocadillo-cubano",
    "cantidad": 1,
    "notas": "Sin picante, por favor"
  }' | jq .

# Esperado: {'error': false, 'message': '...', 'data': {'id': 1, ...}}
# Status: 201 Created
```

### Caso 4b: Validación - Teléfono Requerido

```bash
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "producto": "pizza"
  }' | jq .

# Esperado: {'error': true, 'message': 'Validation failed', status: 400}
```

### Caso 4c: Validación - Cantidad Fuera de Rango

```bash
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "telefono": "+34600123456",
    "producto": "pizza",
    "cantidad": 99
  }' | jq .

# Esperado: Error de validación, cantidad máxima 20
```

### Caso 4d: Validación - Teléfono Inválido

```bash
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "telefono": "esto-no-es-telefono",
    "producto": "cafe",
    "cantidad": 1
  }' | jq .

# Esperado: Error de validación en formato teléfono
```

### Caso 4e: Validación - Producto Inválido

```bash
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "telefono": "+34600123456",
    "producto": "producto-inexistente",
    "cantidad": 1
  }' | jq .

# Esperado: Error de validación, producto no en lista
```

### Caso 4f: Duplicado - Mismo teléfono + producto activo

```bash
# Primer pedido (éxito)
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "telefono": "+34600123456",
    "producto": "bocadillo-cubano",
    "cantidad": 1
  }' | jq .data.id
# Respuesta: 1

# Segundo pedido con mismos datos (debe fallar)
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "telefono": "+34600123456",
    "producto": "bocadillo-cubano",
    "cantidad": 1
  }' | jq .

# Esperado: {'error': true, 'message': 'Ya existe un pedido...', status: 409}
```

## 🔍 Test 5: API Pedidos - Listar (GET)

**Objetivo:** Validar lectura de pedidos

### Caso 5a: Listar Todos (Página 1)

```bash
curl -s http://localhost:3000/api/pedidos | jq .

# Esperado:
# {
#   "error": false,
#   "data": [{...}, {...}],
#   "total": 2,
#   "page": 1,
#   "limit": 50,
#   "pages": 1
# }
```

### Caso 5b: Paginación

```bash
curl -s "http://localhost:3000/api/pedidos?page=1&limit=1" | jq .

# Esperado: Mostrar solo 1 item, total=2, pages=2
```

### Caso 5c: Filtrar por Estado

```bash
curl -s "http://localhost:3000/api/pedidos?estado=pendiente" | jq .

# Esperado: Solo pedidos con estado="pendiente"

curl -s "http://localhost:3000/api/pedidos?estado=completado" | jq .

# Esperado: Array vacío (ninguno completado aún)
```

## 🔍 Test 6: API Reseñas - Crear (POST)

**Objetivo:** Validar creación de opiniones

### Caso 6a: Reseña Válida

```bash
curl -s -X POST http://localhost:3000/api/resenas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "ciudad": "Madrid",
    "texto": "¡Delicioso! Muy buen servicio y ambiente acogedor."
  }' | jq .

# Esperado: {'error': false, 'message': '...', 'data': {'id': 1, estado: 'pendiente', ...}}
# Status: 201 Created
```

### Caso 6b: Validación - Nombre Requerido

```bash
curl -s -X POST http://localhost:3000/api/resenas \
  -H "Content-Type: application/json" \
  -d '{
    "ciudad": "Madrid",
    "texto": "Buena comida"
  }' | jq .

# Esperado: Error de validación
```

### Caso 6c: Validación - Texto Muy Corto

```bash
curl -s -X POST http://localhost:3000/api/resenas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "texto": "OK"
  }' | jq .

# Esperado: Error de validación, mínimo caracteres
```

## 🔍 Test 7: API Reseñas - Listar (GET)

**Objetivo:** Validar lectura de opiniones

### Caso 7a: Listar Públicas (Sin ?all)

```bash
curl -s http://localhost:3000/api/resenas | jq .

# Esperado: Solo reseñas con estado="publicada"
# data: [] (todas están en pendiente)
# pendientes: 1
```

### Caso 7b: Listar Todas (Admin)

```bash
curl -s "http://localhost:3000/api/resenas?all=true" | jq .

# Esperado: Todas las reseñas incluyendo pendientes
# data: [{...}] (incluyendo pendientes)
```

## 🔍 Test 8: Rate Limiting

**Objetivo:** Verificar protección contra abuso

```bash
# Hacer 11 requests rápido al mismo endpoint (límite es 10/min)
for i in {1..11}; do
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test'$i'","telefono":"+346001234'$(printf "%02d" $i)'","producto":"cafe","cantidad":1}' | jq .error
done

# Esperado:
# false (requests 1-10)
# false (request 11 puede pasar por timing)
# Después del límite: ECONNREFUSED o 429 error

# Esperar 61 segundos y volver a intentar
sleep 61
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","telefono":"+34600123456","producto":"cafe","cantidad":1}' | jq .error

# Esperado: false (funciona de nuevo)
```

## 🔍 Test 9: CORS

**Objetivo:** Verificar headers de seguridad

```bash
curl -i http://localhost:3000/

# Verificar headers presentes:
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - X-XSS-Protection: 1; mode=block
# - Referrer-Policy: strict-origin-when-cross-origin
# En producción también: Strict-Transport-Security
```

## 🔍 Test 10: Frontend - Formulario Pedidos

**Objetivo:** Verificar integración frontend-backend

### Pasos:

1. Abrir navegador: `http://localhost:3000`
2. Scroll a sección "Haz tu pedido"
3. Llenar con datos válidos:
   - Nombre: `Jorge Ramírez`
   - Teléfono: `+34 623 456 789`
   - Producto: `Pizza Artesana`
   - Cantidad: `2`
   - Notas: `Extra queso`
4. Click en `Enviar Pedido →`
5. **Esperado:** Mensaje verde "✅ ¡Pedido enviado!"

### Verificar en backend:

```bash
curl -s http://localhost:3000/api/pedidos | jq '.data[-1]'

# Esperado: Último pedido contiene datos de Jorge
```

## 🔍 Test 11: Frontend - Validación

**Objetivo:** Verificar que validaciones funcionan

### Caso 11a: Campo Vacío

1. Abrir `http://localhost:3000`
2. Click en `Enviar Pedido →` sin llenar campos
3. **Esperado:** Mensaje rojo del navegador "Please fill out this field"

### Caso 11b: Cantidad Inválida

1. Llenar nombre, teléfono, producto
2. Cantidad: cambiar a `0` o `99`
3. Click en `Enviar Pedido →`
4. **Esperado:** Navegador rechaza o backend devuelve error

## 🔍 Test 12: Frontend - Responsive

**Objetivo:** Verificar diseño en diferentes tamaños

```bash
# Abrir DevTools (F12) → Device Switch

# Dispositivos a probar:
# - iPhone 12 (390 x 844)
# - iPad (768 x 1024)
# - Laptop (1920 x 1080)

# Verificar:
# - Mobile: Menú hamburguesa aparece
# - Tablet: 2 columnas en cards
# - Desktop: 3 columnas en cards
# - Imágenes responsivas
# - Formularios legibles
# - Botones tocables en mobile (>44x44px)
```

## 🔍 Test 13: Frontend - Animaciones

**Objetivo:** Verificar efectos visuales

1. Abrir `http://localhost:3000`
2. Scroll lentamente hacia abajo
3. **Esperado:** 
   - Elementos revelan suavemente (fade-in + slide-up)
   - Ticker rotativo arriba se anima continuamente
   - Hover en cards: levantamiento y zoom

## 🔍 Test 14: Error Handling

**Objetivo:** Verificar manejo de errores

### Caso 14a: Servidor No Disponible

```bash
# 1. Detener servidor (Ctrl+C)
# 2. Abrir navegador: http://localhost:3000
# 3. Llenar formulario y enviar
# 4. Esperado: Mensaje rojo con error

# 5. Reiniciar servidor
# npm start
# 6. Volver a intentar
# 7. Esperado: Funciona nuevamente
```

## 📊 Checklist Final

```
Backend:
☐ Servidor inicia sin errores
☐ Health check responde
☐ POST /api/pedidos funciona
☐ GET /api/pedidos funciona
☐ POST /api/resenas funciona
☐ GET /api/resenas funciona
☐ Validación rechaza datos inválidos
☐ Rate limiting activo
☐ CORS headers correctos
☐ Errores loguean correctamente

Frontend:
☐ Página carga en todos los tamaños
☐ Menú hamburguesa en mobile
☐ Formularios validados (HTML5)
☐ Forma de pedidos envía datos correctos
☐ Forma de opiniones envía datos correctos
☐ Mensajes de éxito aparecen
☐ Mensajes de error aparecen
☐ Animaciones suave (no jerky)
☐ Links internos navegan
☐ Contacto enlaces funcionan (tel:, mailto:)

Integración:
☐ Frontend puede escribir en backend
☐ Frontend puede leer del backend
☐ Almacenamiento JSON funciona
☐ Datos persisten tras restart
☐ Búsqueda/filtrado funciona
```

## 🚀 Próximos Pasos

1. **Autenticación Admin** — Jwt tokens, panel admin
2. **Persistencia Real** — PostgreSQL en lugar de JSON
3. **Panel Administrativo** — Gestionar pedidos/opiniones
4. **Notificaciones** — Email/SMS al crear pedido
5. **Pagos** — Integración Stripe o TPV
6. **Analytics** — Dashboard de métricas

---

**Generated:** 2026-03-09  
**Last Updated:** 2026-03-09
