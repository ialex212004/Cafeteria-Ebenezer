# 🔍 PRE-DEPLOY REVIEW CHECKLIST — Cafetería Ebenezer

**Objetivo:** Verificación exhaustiva antes de GitHub push + Hostinger deploy  
**Tiempo estimado:** 1-1.5 horas  
**Fecha:** 2026-03-09  

---

## 📋 SECCIÓN 1: Revisión de Código Backend (45 min)

### 1.1 Estructura y Organización

- [ ] **Directorios correctos:**
  ```bash
  # Ejecutar y verificar
  tree -L 2 -I 'node_modules|logs'
  ```
  Debe mostrar:
  ```
  .
  ├── src/
  │   ├── config/
  │   ├── middleware/
  │   ├── routes/
  │   ├── utils/
  │   └── validators/
  ├── public/
  ├── data/
  └── package.json
  ```

- [ ] **Archivos principales existen:**
  ```bash
  ls -la src/config/index.js
  ls -la src/middleware/{security.js,rateLimiter.js,validation.js,errorHandler.js}
  ls -la src/routes/{pedidos.js,resenas.js,health.js}
  ls -la src/utils/{logger.js,dataManager.js}
  ls -la src/validators/index.js
  ls -la server.js
  ```

### 1.2 Código Backend - Validación

- [ ] **No hay errores ESLint:**
  ```bash
  npm run lint
  # Debe no devolver errores críticos
  ```

- [ ] **No hay console.log sin razón:**
  ```bash
  grep -r "console.log" src/ --exclude-dir=node_modules
  # Verificar que solo existan en logger.js
  ```

- [ ] **No hay variables no utilizadas:**
  ```bash
  grep -r "_unused" src/ --exclude-dir=node_modules
  # Pueden estar presentes como prevención
  ```

- [ ] **Imports correctos en cada archivo:**
  ```bash
  head -15 src/routes/pedidos.js
  head -15 src/routes/resenas.js
  # Verificar que require() correcto
  ```

### 1.3 Configuración Backend

- [ ] **`.env.example` contiene todas las variables:**
  ```bash
  cat .env.example
  ```
  Debe incluir:
  - NODE_ENV
  - PORT
  - LOG_LEVEL
  - CORS_ORIGIN
  - MAX_JSON_SIZE
  - etc.

- [ ] **`.gitignore` excluye archivos sensibles:**
  ```bash
  cat .gitignore
  # Debe incluir: .env, node_modules/, logs/, *.log
  ```

- [ ] **`package.json` scripts correctos:**
  ```bash
  grep -A 5 '"scripts"' package.json
  ```
  Debe tener:
  - `start`: `node server.js`
  - `dev`: `nodemon server.js` (opcional)
  - `lint`: `eslint src/`
  - `format`: `prettier --write src/`

### 1.4 Database / Data Files

- [ ] **Archivos JSON están vacíos (limpios):**
  ```bash
  cat data/pedidos.json
  cat data/resenas.json
  # Deben ser: []
  ```

- [ ] **Archivos JSON tienen permisos lectura/escritura:**
  ```bash
  ls -la data/
  # rwxr-xr-x (755) mínimo
  ```

- [ ] **No hay datos de prueba en commmits:**
  ```bash
  git log --oneline | head -5
  # Verificar que últimos commits dicen "limpiar datos"
  ```

---

## 📋 SECCIÓN 2: Revisión de Código Frontend (30 min)

### 2.1 HTML Estructura

- [ ] **`public/index.html` existe y es válido:**
  ```bash
  file public/index.html
  wc -l public/index.html
  # Debe ser HTML, ~650+ líneas
  ```

- [ ] **HTML tiene estructura correcta:**
  ```bash
  grep -c "<!DOCTYPE" public/index.html
  # Debe ser 1
  grep -c "<html" public/index.html
  # Debe ser 1
  grep -c "<body" public/index.html
  # Debe ser 1
  ```

- [ ] **Secciones presentes:**
  ```bash
  grep -o "id=\"[^\"]*\"" public/index.html | sort -u
  ```
  Debe incluir: `site-header`, `menu`, `nosotros`, `opiniones`, `pedidos`, `ubicacion`

### 2.2 Formularios y JavaScript

- [ ] **Formularios tienen IDs correctos:**
  ```bash
  grep -o "id=\"[a-zA-Z]*Form\"" public/index.html
  # Debe mostrar: orderForm, reviewForm
  ```

- [ ] **Endpoints de API correctos en JS:**
  ```bash
  grep -o "/api/[a-z]*" public/index.html | sort -u
  # Debe mostrar: /api/pedidos, /api/resenas (NO /api/pedido, /api/resena)
  ```

- [ ] **Detección de ambiente presente:**
  ```bash
  grep "window.location.hostname === 'localhost'" public/index.html
  # Debe estar presente
  ```

### 2.3 Estilos CSS

- [ ] **CSS Variables definidos:**
  ```bash
  grep -o "--[a-z]*:" public/index.html | head -5
  # Debe mostrar: --bg, --orange, --brown, etc.
  ```

- [ ] **Responsive breakpoints:**
  ```bash
  grep "@media" public/index.html
  # Debe haber al menos 2 breakpoints (900px, 560px)
  ```

### 2.4 Assets y Links

- [ ] **Imágenes son de CDN externo:**
  ```bash
  grep "unsplash.com" public/index.html
  # Debe estar presente (no imágenes locales = deploy más rápido)
  ```

- [ ] **Google Fonts conecta:**
  ```bash
  grep "fonts.googleapis.com" public/index.html
  # Debe estar presente
  ```

- [ ] **Links internos funcionan:**
  ```bash
  grep -o 'href="#[^"]*"' public/index.html | sort -u
  # Todas deben apuntar a secciones existentes
  ```

---

## 📋 SECCIÓN 3: Testing Manual - Backend (25 min)

### 3.1 Iniciar y Verificar Servidor

**En Terminal 1:**
```bash
cd /workspaces/Cafeteria-Ebenezer
npm start

# Esperado: [INFO] Servidor escuchando en http://localhost:3000
```

**En Terminal 2:** 

- [ ] **Health check:**
  ```bash
  curl -s http://localhost:3000/health | jq .
  # Esperado: {"status":"OK", "server":"...", "uptime":...}
  ```

- [ ] **Página HTML se sirve:**
  ```bash
  curl -s http://localhost:3000/ | head -20 | grep -c "<!DOCTYPE"
  # Esperado: 1
  ```

### 3.2 API Pedidos - Happy Path

- [ ] **CREATE: POST /api/pedidos (válido)**
  ```bash
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Juan Test",
      "telefono": "+34600123456",
      "producto": "bocadillo-cubano",
      "cantidad": 1,
      "notas": "Test"
    }' | jq '.data.id'
  # Esperado: 1 (o siguiente ID)
  ```

- [ ] **READ: GET /api/pedidos**
  ```bash
  curl -s http://localhost:3000/api/pedidos | jq '.total'
  # Esperado: 1
  ```

- [ ] **UPDATE: PATCH /api/pedidos/1**
  ```bash
  curl -s -X PATCH http://localhost:3000/api/pedidos/1 \
    -H "Content-Type: application/json" \
    -d '{"estado":"confirmado"}' | jq '.data.estado'
  # Esperado: "confirmado"
  ```

- [ ] **READ actualizado:**
  ```bash
  curl -s "http://localhost:3000/api/pedidos?estado=confirmado" | jq '.data[0].estado'
  # Esperado: "confirmado"
  ```

### 3.3 API Reseñas - Happy Path

- [ ] **CREATE: POST /api/resenas (válido)**
  ```bash
  curl -s -X POST http://localhost:3000/api/resenas \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "María Test",
      "ciudad": "Madrid",
      "texto": "Excelente comida y servicio, muy recomendado!"
    }' | jq '.data.id'
  # Esperado: 1
  ```

- [ ] **READ: GET /api/resenas (solo publicadas)**
  ```bash
  curl -s http://localhost:3000/api/resenas | jq '.data | length'
  # Esperado: 0 (porque estado es "pendiente")
  ```

- [ ] **READ admin: GET /api/resenas?all=true**
  ```bash
  curl -s "http://localhost:3000/api/resenas?all=true" | jq '.data[0].estado'
  # Esperado: "pendiente"
  ```

### 3.4 Validación (Error Cases)

- [ ] **Validación: Teléfono requerido**
  ```bash
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test","producto":"pizza"}' | jq '.error'
  # Esperado: true
  ```

- [ ] **Validación: Cantidad fuera de rango**
  ```bash
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test","telefono":"+34600000000","producto":"cafe","cantidad":99}' \
    | jq '.error'
  # Esperado: true
  ```

- [ ] **Duplicado previene segundo pedido**
  ```bash
  # Primer pedido (éxito)
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test2","telefono":"+34600111111","producto":"pizza","cantidad":1}' \
    | jq '.data.id'
  # Esperado: 3 (o siguiente)

  # Segundo con mismo teléfono + producto (fallo)
  curl -s -X POST http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test2","telefono":"+34600111111","producto":"pizza","cantidad":1}' \
    | jq '.message'
  # Esperado: texto sobre duplicado
  ```

### 3.5 Rate Limiting

- [ ] **Rate limit se aplica:**
  ```bash
  # Ejecutar 12 requests rápido
  for i in {1..12}; do
    curl -s -X POST http://localhost:3000/api/pedidos \
      -H "Content-Type: application/json" \
      -d '{"nombre":"Test'$i'","telefono":"+346001234'$(printf "%02d" $i)'","producto":"cafe","cantidad":1}' \
      | jq '.error'
  done
  # Esperado: primeros 10 "false", luego fallos
  ```

---

## 📋 SECCIÓN 4: Testing Manual - Frontend (20 min)

**Abrir navegador: http://localhost:3000**

### 4.1 Navegación y Layout

- [ ] **Página carga completamente**
  - Página no tiene errores en console (F12)
  - Imágenes cargan
  - Estilos se aplican

- [ ] **Navegación funciona:**
  - [ ] Click en "Menú" → scroll a esa sección
  - [ ] Click en "Nosotros" → scroll
  - [ ] Click en "Opiniones" → scroll
  - [ ] Click en "Ubicación" → scroll
  - [ ] Click en "Pedir Ahora" → scroll a formulario

- [ ] **Mobile menu funciona (si < 900px):**
  - [ ] Click en hamburguesa → abre menu
  - [ ] Click en un link → cierra menu

### 4.2 Formulario de Pedidos

- [ ] **Form renderiza correctamente:**
  - [ ] Campos visibles: Nombre, Teléfono, Producto, Cantidad, Notas
  - [ ] Select tiene opciones (Bocadillo, Pizza, Postre, Café, Otro)
  - [ ] Botón "Enviar Pedido →" visible

- [ ] **Envío exitoso:**
  1. Llenar:
     - Nombre: "Jorge Ruiz"
     - Teléfono: "+34 623 456 789"
     - Producto: "Pizza Artesana"
     - Cantidad: 2
     - Notas: "Extra queso"
  2. Click "Enviar Pedido →"
  3. Esperado: Mensaje verde "✅ ¡Pedido enviado!"
  4. Form se limpia

- [ ] **Validación:**
  1. Click submit vacío
  2. Esperado: "Please fill out this field."

### 4.3 Formulario de Opiniones

- [ ] **Form renderiza correctamente:**
  - [ ] Campos: Nombre, Ciudad, Tu opinión
  - [ ] Botón "Enviar Opinión →" visible

- [ ] **Envío exitoso:**
  1. Llenar:
     - Nombre: "Valentina"
     - Ciudad: "Madrid"
     - Opinión: "¡Delicioso! Muy buen café y ambiente acogedor. Volveré pronto."
  2. Click "Enviar Opinión →"
  3. Esperado: Mensaje verde "✅ ¡Gracias por tu opinión, Valentina!"
  4. Form se limpia

### 4.4 Responsive Design

**En DevTools (F12):**

- [ ] **Mobile (390px):**
  - [ ] Menú hamburguesa aparece
  - [ ] Contenido legible
  - [ ] Botones tocables (>44px)

- [ ] **Tablet (768px):**
  - [ ] 2 columnas en cards
  - [ ] Formarios adaptan

- [ ] **Desktop (1920px):**
  - [ ] 3 columnas en cards
  - [ ] Full width layout

### 4.5 Animaciones y Efectos

- [ ] **Hover effects:**
  - Hover en cards → levantamiento
  - Hover en links → cambio color

- [ ] **Scroll animations:**
  - Scroll lentamente
  - Elementos aparecen con fade-in

---

## 📋 SECCIÓN 5: Seguridad (15 min)

### 5.1 Headers de Seguridad

```bash
curl -i http://localhost:3000/ | grep -i "X-"
```

Debe mostrar:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`

### 5.2 CORS

```bash
curl -i -H "Origin: http://example.com" http://localhost:3000/api/health | grep -i "access-control"
```

Debe mostrar:
- [ ] `Access-Control-Allow-Origin:`

### 5.3 Rate Limiting

- [ ] Ya fue testeado en 3.5

### 5.4 Validación

- [ ] Ya fue testeado en 3.4

### 5.5 Datos Sensibles

- [ ] **No hay credenciales en repo:**
  ```bash
  grep -r "password\|secret\|token" . --exclude-dir=node_modules | grep -v node_modules
  # No debe haber valores reales
  ```

- [ ] **`.env` NO está en git:**
  ```bash
  git ls-files | grep ".env$"
  # No debe mostrar nada (solo .env.example)
  ```

---

## 📋 SECCIÓN 6: Configuración y Deployment (15 min)

### 6.1 Package.json

- [ ] **Version correcta:**
  ```bash
  jq '.version' package.json
  ```

- [ ] **Dependencias actualizadas:**
  ```bash
  npm outdated
  # No debe haber warnings críticos
  ```

- [ ] **No hay dependencias innecesarias:**
  ```bash
  npm ls
  # Validar que solo tenga lo necesario
  ```

### 6.2 Environment Variables

- [ ] **`.env.example` está completo:**
  ```bash
  cat .env.example
  # Revisar que tenga todas las variables necesarias
  ```

- [ ] **Todos los valores en `.env.example` son ejemplos (no secretos reales)**

### 6.3 Logs

- [ ] **Directorio logs puede crearse:**
  ```bash
  ls -la logs/
  # Debe existir o poder crearse
  ```

- [ ] **Log file existe:**
  ```bash
  ls -la logs/server.log 2>/dev/null || echo "Se creará en prod"
  ```

---

## 📋 SECCIÓN 7: Git y Commits (10 min)

### 7.1 Git Status

- [ ] **Sin cambios sin commit:**
  ```bash
  git status
  # Debe mostrar "On branch main, nothing to commit, working tree clean"
  ```

### 7.2 Commits

- [ ] **Últimos 5 commits tienen mensajes claros:**
  ```bash
  git log --oneline -5
  # Todos deben tener descripción clara
  ```

- [ ] **No hay commits vacíos:**
  ```bash
  git log --pretty --oneline | grep -i "fix typo\|wip\|temp"
  # Idealmente 0 resultados
  ```

### 7.3 Branches

- [ ] **Estamos en main:**
  ```bash
  git branch
  # Esperado: * main
  ```

- [ ] **Main está actualizado:**
  ```bash
  git log -1 --pretty=format:"%h - %s"
  # Debe ser último commit importante
  ```

---

## 📋 SECCIÓN 8: Documentación (10 min)

### 8.1 Archivos README

- [ ] **README.md existe y es legible:**
  ```bash
  wc -l README.md
  # Debe ser 100+ líneas
  ```

- [ ] **API.md existe:**
  ```bash
  test -f API.md && echo "✅ Existe" || echo "❌ No existe"
  ```

- [ ] **FRONTEND.md existe:**
  ```bash
  test -f FRONTEND.md && echo "✅ Existe" || echo "❌ No existe"
  ```

- [ ] **TESTING.md existe:**
  ```bash
  test -f TESTING.md && echo "✅ Existe" || echo "❌ No existe"
  ```

- [ ] **HOSTINGER_SETUP.md existe:**
  ```bash
  test -f HOSTINGER_SETUP.md && echo "✅ Existe" || echo "❌ No existe"
  ```

### 8.2 Contenido de Docs

- [ ] **README incluye:**
  - [ ] Descripción del proyecto
  - [ ] Instalación (npm install)
  - [ ] Cómo correr (npm start)
  - [ ] API overview
  - [ ] Deploy notes

---

## 📋 SECCIÓN 9: Final Smoke Test (10 min)

### 9.1 Reiniciar desde cero

```bash
# Parar servidor (Ctrl+C)

# Limpiar datos
echo "[]" > data/pedidos.json
echo "[]" > data/resenas.json

# Reiniciar
npm start

# En otra terminal
curl http://localhost:3000/api/health | jq '.status'
# Esperado: "OK"
```

### 9.2 Simular carga

```bash
# Hacer 20 requests rápido
for i in {1..20}; do
  curl -s http://localhost:3000/api/pedidos \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test","telefono":"+34600000'$(printf "%03d" $i)'","producto":"cafe","cantidad":1}' &
done
wait

# Verificar que algunos pasaron y algunos fueron bloqueados por rate limit
```

---

## 📋 CHECKLIST FINAL

Antes de hacer commit/push, marcar:

- [ ] ✅ Backend código sin errores
- [ ] ✅ Frontend HTML/CSS/JS válido
- [ ] ✅ API endpoints funcionan (happy path)
- [ ] ✅ Validación rechaza datos inválidos
- [ ] ✅ Rate limiting activo
- [ ] ✅ Formularios funcionan en navegador
- [ ] ✅ Responsive en mobile/tablet/desktop
- [ ] ✅ Seguridad headers presentes
- [ ] ✅ Sin credenciales en repo
- [ ] ✅ Git status limpio
- [ ] ✅ Documentación completa
- [ ] ✅ Datos limpios ([]  arrays)

---

## 🚀 Resultado

Si TODO ✅ pasa:

```bash
# No hacer cambios, solo push
git push -u origin main

# Ir a Hostinger (Fase 7)
```

Si algo ❌ falla:

1. Identificar el problema
2. Fixearlo localmente
3. Testing nuevamente
4. Commit
5. Repeat hasta que TODO ✅

---

**Tiempo total estimado: 1.5 horas**  
**Beneficio: Evitar sorpresas en producción**

---

*Documentación creada: 2026-03-09*
