# 🔍 GUÍA DE REVISIÓN SIMPLIFICADA (Paso a Paso)

**Objetivo:** Revisar todo el proyecto antes de GitHub push + Hostinger deploy  
**Tiempo estimado:** 1.5 horas  
**Dificultad:** ⭐ Fácil (solo copiar/pegar en terminal)

---

## PASO 1️⃣: Verificación de Estructura (2 min)

Ejecuta esto en terminal:

```bash
cd /workspaces/Cafeteria-Ebenezer
echo "✅ Verificando estructura..."

# Debería mostrar archivos sin errores
ls -la src/config/ src/middleware/ src/routes/ src/utils/ src/validators/
ls -la public/index.html
ls -la data/pedidos.json data/resenas.json

echo "✅ Estructura OK"
```

**Esperado:** Lista de archivos sin errores.

---

## PASO 2️⃣: Verificar que NO hay datos pendientes (3 min)

```bash
# Verificar que los archivos de datos están vacíos
cat data/pedidos.json
cat data/resenas.json

# Ambos deben mostrar: []
```

**Si tienen datos:**
```bash
echo "[]" > data/pedidos.json
echo "[]" > data/resenas.json
git add -A
git commit -m "🧹 Limpiar datos antes de deploy"
```

---

## PASO 3️⃣: Verificar Git (2 min)

```bash
# Verificar rama y estado
git branch
git status

# DEBE mostrar:
# * main
# On branch main, nothing to commit, working tree clean
```

**Si hay cambios sin commit:**
```bash
git add -A
git commit -m "📝 Cambios finales antes de review"
```

---

## PASO 4️⃣: Revisar Endpoints en Frontend (3 min)

```bash
# Verificar que endpoints son correctos (sin typos)
grep -c "/api/pedidos" public/index.html
grep -c "/api/resenas" public/index.html

# Ambos deben devolver: 1 (o más)
```

**Si devuelven 0:**
```bash
# Revisar manualmente public/index.html y buscar:
# - /api/pedido (❌ MALO)
# - /api/pedidos (✅ CORRECTO)
```

---

## PASO 5️⃣: Verificar que NO hay credenciales (3 min)

```bash
# Buscar palabras claves peligrosas
grep -r "password.*=" src/ 2>/dev/null | grep -v node_modules || echo "✅ OK"
grep -r "secret.*=" src/ 2>/dev/null | grep -v node_modules || echo "✅ OK"
grep -r "token.*=" src/ 2>/dev/null | grep -v node_modules || echo "✅ OK"

# Verificar que .env NO está en git
git ls-files | grep ".env$" && echo "❌ PROBLEMA: .env en git!" || echo "✅ .env no en git"
```

**Esperado:** Solo "✅ OK" y ".env no en git"

---

## PASO 6️⃣: Testing Manual - Servidor (10 min)

### Terminal 1: Iniciar servidor

```bash
npm start

# Esperado: [INFO] Servidor escuchando en http://localhost:3000
```

### Terminal 2: Tests API

```bash
# Health check
curl -s http://localhost:3000/health | jq .status
# Esperado: "OK"

# GET home
curl -s http://localhost:3000/ | head -5
# Esperado: <!DOCTYPE html

# Crear pedido
curl -s -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","telefono":"+34600000000","producto":"bocadillo-cubano","cantidad":1}' \
  | jq '.data.id'
# Esperado: 1

# Listar pedidos
curl -s http://localhost:3000/api/pedidos | jq '.total'
# Esperado: 1

# Crear reseña
curl -s -X POST http://localhost:3000/api/resenas \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","ciudad":"Madrid","texto":"Excelente"}' \
  | jq '.data.id'
# Esperado: 1

# Listar reseñas (todas)
curl -s "http://localhost:3000/api/resenas?all=true" | jq '.total'
# Esperado: 1
```

✅ **Si todos devuelven valores esperados, API está OK**

---

## PASO 7️⃣: Testing Manual - Frontend (5 min)

Abre en navegador: **http://localhost:3000**

Checklist visual:
- [ ] Página carga sin errores
- [ ] Imágenes cargan
- [ ] Navbar aparece
- [ ] Puedes scrollear

Abre DevTools (F12) → Console tab:
- [ ] ❌ **Sin errores rojos**

---

## PASO 8️⃣: Testing de Formularios (10 min)

**En el navegador (http://localhost:3000):**

### Formulario de Pedidos:

1. Scroll a "Haz tu pedido"
2. Llenar:
   - Nombre: "Juan Test"
   - Teléfono: "+34 600 123 456"
   - Producto: "Bocadillo Cubano"
   - Cantidad: 1
3. Click "Enviar Pedido →"
4. **Esperado:** Mensaje verde "✅ ¡Pedido enviado!"
5. Form debe estar en blanco después

### Formulario de Opiniones:

1. Scroll a "Deja tu opinión"
2. Llenar:
   - Nombre: "María"
   - Ciudad: "Madrid"
   - Tu opinión: "Muy bueno!"
3. Click "Enviar Opinión →"
4. **Esperado:** Mensaje verde "✅ ¡Gracias por tu opinión, María!"
5. Form debe estar en blanco después

✅ **Si ambos funcionan, frontend está OK**

---

## PASO 9️⃣: Testing de Responsive (5 min)

En navegador con DevTools (F12):

1. Click en "Toggle device toolbar" (o Ctrl+Shift+M)
2. Cambiar a **iPhone 12** (390px):
   - [ ] Página legible
   - [ ] Menú hamburguesa aparece
3. Cambiar a tabletancho (768px):
   - [ ] 2 columnas en cards
4. Cambiar a Desktop (1920px):
   - [ ] 3 columnas en cards

✅ **Si se ve bien en todos, responsive está OK**

---

## PASO 🔟: Validación (5 min)

En navegador (http://localhost:3000):

1. Ir a "Haz tu pedido"
2. Click "Enviar Pedido →" SIN llenar campos
3. Debe mostrar: "Please fill out this field"
4. Llenar nombre y teléfono, dejar cantidad vacía
5. Debe rechazar

✅ **Si la validación funciona, está OK**

---

## PASO 1️⃣1️⃣: Documentación (3 min)

Verificar que existen estos archivos:

```bash
ls -lah README.md API.md FRONTEND.md TESTING.md HOSTINGER_SETUP.md NEXT_STEPS.md PROJECT_SUMMARY.md

# Todos deben existir (ls sin error)
```

✅ **Si todos existen, documentación está OK**

---

## PASO 1️⃣2️⃣: Limpieza Final (5 min)

```bash
# Limpiar datos de prueba
echo "[]" > data/pedidos.json
echo "[]" > data/resenas.json

# Verificar que git está limpio
git status
# DEBE mostrar: "On branch main, nothing to commit"

# Si hay cambios:
git add -A
git commit -m "🧹 Datos limpios antes de deploy"

# Ver commits finales
git log --oneline -5
```

---

## RESUMEN DE CHECKLIST

Marca cada uno ✅:

**Estructura:**
- [ ] ✅ Directorios y archivos existen
- [ ] ✅ Data files están vacíos ([])
- [ ] ✅ Git está limpio
- [ ] ✅ No hay credenciales

**Endpoints:**
- [ ] ✅ /api/pedidos funciona
- [ ] ✅ /api/resenas funciona
- [ ] ✅ Health check funciona

**Frontend:**
- [ ] ✅ Página carga
- [ ] ✅ Sin errores en console
- [ ] ✅ Formularios responden
- [ ] ✅ Mensajes de éxito aparecen

**Responsive:**
- [ ] ✅ Mobile (390px) OK
- [ ] ✅ Tablet (768px) OK
- [ ] ✅ Desktop (1920px) OK

**Validación:**
- [ ] ✅ Rechaza datos inválidos

**Documentación:**
- [ ] ✅ Todos los .md existen

---

## 🚀 SI TODO ✅ PASA:

```bash
# Crear commit final si falta
git add -A
git commit -m "✅ Pre-deploy review completado" || echo "Ya todo committed"

# Ver estado final
git log --oneline -3
git status

echo "🎉 LISTO PARA GITHUB PUSH + HOSTINGER DEPLOY"
```

---

## ❌ SI ALGO FALLA:

1. Identifica qué falló
2. Busca en los PRE_DEPLOY_REVIEW.md (sección correspondiente)
3. Fixea el problema
4. Hazlo de nuevo desde PASO 1

---

## 📞 AYUDA RÁPIDA

| Problema | Solución |
|---|---|
| "Cannot GET /" | `npm start` - servidor no corre |
| "Cannot POST /api/pedidos" | Servidor no corre |
| Formularios no envían | Console tiene errores, revisar (F12) |
| Página se ve fea | Limpiar cache (Ctrl+Shift+R) |
| Rate limiting | Esperar 60 segundos, reintentar |
| Git commit falla | `git add -A`, luego `git commit` |

---

**¡Éxito con la revisión! 🚀**
