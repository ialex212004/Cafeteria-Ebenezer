# 🚀 VERCEL DEPLOYMENT GUIDE

## Estructura del Proyecto para Vercel

```
Cafeteria-Ebenezer/
├── api/
│   └── index.js              # Serverless function (Express app)
├── public/
│   └── index.html            # Frontend estático
├── src/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── validators/
├── data/                     # JSON files (temporal)
├── vercel.json              # ⭐ Configuración de Vercel
├── private/.env.vercel.example      # ⭐ Variables para Vercel
├── .gitignore               # ⭐ Actualizado con .vercel
├── package.json             # ⭐ Scripts actualizados
├── server.js                # Todavía existe para dev local
└── README.md
```

---

## PASO 1: Reestructuración Local (YA HECHO)

✅ Archivos creados:
- `api/index.js` - Función serverless de Express
- `vercel.json` - Rutas y configuración
- `private/.env.vercel.example` - Variables de entorno para Vercel
- `.gitignore` - Actualizado con archivos de Vercel

---

## PASO 2: Comandos Git Exactos

### 2.1 - Verificar estado
```bash
cd /workspaces/Cafeteria-Ebenezer
git status
```

### 2.2 - Agregar cambios
```bash
git add api/index.js vercel.json private/.env.vercel.example .gitignore package.json
```

### 2.3 - Crear commit
```bash
git commit -m "🚀 Vercel deployment: serverless backend + static frontend

- Created /api/index.js: Serverless Express function
- Added vercel.json: Routes and build configuration
- Updated .gitignore: Added Vercel exclusions
- Updated package.json: Added vercel scripts
- Added private/.env.vercel.example: Environment template"
```

### 2.4 - Push a GitHub (MÁXIMO IMPORTANTE)
```bash
# Verificar que estás en rama main
git branch

# Si no estás en main, hazlo:
git checkout main

# Push a GitHub
git push -u origin main
```

---

## PASO 3: Conectar con GitHub

Si aún NO tienes repositorio creado en GitHub:

```bash
# 1. Inicializar repo (si no lo hiciste ya)
git init
git add .
git commit -m "Initial commit: Cafetería Ebenezer MVP"

# 2. Agregar remote
git remote add origin https://github.com/ialex212004/Cafeteria-Ebenezer.git

# 3. Renombrar rama a main (si es necesario)
git branch -M main

# 4. Push inicial
git push -u origin main
```

Si YA tienes repo:
```bash
git push origin main
```

---

## PASO 4: Conectar con Vercel

### 4.1 - Login en Vercel
```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Hacer login
vercel login

# Selecciona: GitHu
b → Continua en navegador
```

### 4.2 - Importar Proyecto
```bash
# Desde la carpeta del proyecto
vercel

# Responde las preguntas:
# ¿Configurar y desplegar? → y
# ¿Qué alcance? → [Tu cuenta personal]
# ¿Enlazar a proyecto existente? → n
# ¿Nombre del proyecto? → cafeteria-ebenezer
# ¿Raíz del proyecto? → ./
# ¿Comando de compilación? → (blank - Enter)
# ¿Directorio de salida? → (blank - Enter)
```

Vercel automáticamente detectará GitHub y configurará:
- ✅ CI/CD: Deploy en cada push a main
- ✅ Preview URLs: Para PRs
- ✅ Dominio final: https://cafeteria-ebenezer.vercel.app

---

## PASO 5: Configurar Variables de Entorno

### 5.1 - Opción A: Desde Vercel CLI
```bash
vercel env pull
# Esto descarga .env.local de Vercel
```

### 5.2 - Opción B: Dashboard Vercel
1. Ve a https://vercel.com/dashboard
2. Selecciona proyecto "cafeteria-ebenezer"
3. Settings → Environment Variables
4. Agrega cada variable:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://cafeteria-ebenezer.vercel.app`
   - Otros según necesites

---

## PASO 6: Verificar Deployment

```bash
# Ver estado
vercel status

# Ver logs
vercel logs cafeteria-ebenezer

# Abrir en navegador
vercel inspect cafeteria-ebenezer
```

Tu sitio estará en: **https://cafeteria-ebenezer.vercel.app**

---

## PASO 7: Continuar Desarrollo Local

Para seguir desarrollando en local:
```bash
npm run dev
# O modo Vercel local:
npm run vercel-dev
```

Los cambios se pushen automáticamente a Vercel:
```bash
git add .
git commit -m "Feature: descripción"
git push origin main
# → Vercel deploy automático en ~30sec
```

---

## 📝 Diferencias con Hostinger

| Aspecto | Vercel | Hostinger |
|--------|--------|-----------|
| **Deploy** | Git push → Automático | Webhook manual |
| **Escalado** | Automático (serverless) | Manual |
| **HTTPS** | Incluido | Incluido |
| **Precio** | Free tier generous | Pago mensual |
| **Mejor para** | Proyectos JS/Next.js | Hosting tradicional |

---

## ⚡ Checklist Pre-Deploy

- [ ] `vercel.json` creado y correcto
- [ ] `api/index.js` exporta Express app
- [ ] `public/index.html` existe
- [ ] `.gitignore` incluye `.vercel`
- [ ] `package.json` tiene "vercel-build" script
- [ ] Variables de entorno configuradas
- [ ] GitHub push completado
- [ ] Vercel conectado y desplegado

---

## 🆘 Troubleshooting

**Error: "Cannot find module 'express'"**
→ `npm install` en Vercel automático, si falla: check `package.json`

**Error: "CORS error"**
→ Actualiza `CORS_ORIGIN` en Vercel env vars

**Frontend no abre**
→ Verifica `vercel.json` rutas, especialmente fallback SPA

**API retorna 404**
→ Confirma que `/api/*` mapea a `api/index.js` en `vercel.json`

---

## 📚 Próximas Fases (Post-Deploy)

1. **Phase 8**: JWT + Admin Panel
2. **Phase 9**: PostgreSQL (Vercel compatible)
3. **Phase 10**: Email Notifications (SendGrid)
4. **Phase 11**: Payment (Stripe)
5. **Phase 12**: Analytics (Vercel Analytics)

---

**¿Dudas?** Consulta:
- https://vercel.com/docs
- https://vercel.com/docs/concepts/functions/serverless-functions
