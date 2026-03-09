# 📋 PRÓXIMOS PASOS — Cafetería Ebenezer

Plan de acción para las fases siguientes del proyecto.

## 📌 Fase 6: GitHub Push & CI/CD (1 hora)

**Estado:** Pendiente de inicio  
**Bloqueador:** Ninguno  

### Tareas:

- [ ] **6.1** Crear repositorio en GitHub
  - Usuario GitHub: `ialex212004` (o tu cuenta)
  - Nombre repo: `Cafeteria-Ebenezer`
  - Privado o público
  - Agregar descripción: "Sitio profesional para gestionar pedidos y opiniones de Cafetería Ebenezer"

- [ ] **6.2** Push inicial
  ```bash
  git remote add origin https://github.com/ialex212004/Cafeteria-Ebenezer.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **6.3** Crear `.github/workflows/deploy.yml` para automático deploy
  - Trigger: Push a `main`
  - Build: `npm install && npm run build` (si aplica)
  - Deploy: Notificar a Hostinger via webhook

### Salida esperada:
✅ Código disponible en GitHub  
✅ CI/CD pipeline activo  
✅ Cada push a `main` = deploy automático

---

## 📌 Fase 7: Deploy a Hostinger (2 horas)

**Estado:** Pendiente  
**Bloqueador:** GitHub push debe estar completo  
**Doc:** Ver [HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md)

### Tareas:

- [ ] **7.1** Crear cuenta Hostinger Node.js hosting
  - Sign up: https://www.hostinger.com/nodejs-hosting
  - Elegir plan: Hatchling o Business (recomendado)
  - Conectar dominio: `cafeteriaebenezer.site` (o custom)

- [ ] **7.2** Configurar Hostinger panel
  - Conectar GitHub repo
  - Configurar Environment Variables:
    ```
    NODE_ENV=production
    PORT=3000
    LOG_LEVEL=info
    CORS_ORIGIN=https://cafeteriaebenezer.site
    ```
  - Configurar webhook de deploy

- [ ] **7.3** Pruebas post-deploy
  ```bash
  curl https://cafeteriaebenezer.site/
  curl https://cafeteriaebenezer.site/api/health
  # Llenar formularios en página en vivo
  ```

### Salida esperada:
✅ Sitio disponible en `https://cafeteriaebenezer.site`  
✅ API funcionando en producción  
✅ SSL/TLS certificado (automático)  
✅ Cada push a GitHub = deploy automático

---

## 📌 Fase 8: Autenticación Admin (3 horas)

**Estado:** Pendiente  
**Bloqueador:** Deploy debe estar activo  
**Requisito:** JWT tokens

### Tareas:

- [ ] **8.1** Implementar JWT en backend
  - Instalar: `npm install jsonwebtoken bcryptjs`
  - Crear `/src/routes/auth.js`:
    - POST `/api/auth/login` — validar usuario
    - POST `/api/auth/logout` — limpiar token
  - Crear middleware `/src/middleware/validateJWT.js`
  - Guardar admin credentials en `.env`

- [ ] **8.2** Crear panel admin frontend
  - Nueva ruta: `/admin` (protegida)
  - Form de login: usuario/contraseña
  - Dashboard con:
    - Lista de pedidos con filtros
    - Lista de opiniones con estado (aprobado/rechazado)
    - Botones para marcar como completado/rechazado
    - Estadísticas básicas

- [ ] **8.3** Proteger endpoints
  - GET `/api/pedidos` — solo admin
  - GET `/api/resenas?all=true` — solo admin
  - PATCH `/api/pedidos/:id` — solo admin
  - PATCH `/api/resenas/:id` — solo admin

### Salida esperada:
✅ Admin puede loguear con JWT  
✅ Panel admin funcional  
✅ Datos seguros (no acceso público)  
✅ Mensages y logout funcionales

---

## 📌 Fase 9: Base de Datos Real (2 horas)

**Estado:** Pendiente  
**Bloqueador:** Autenticación debe estar implementada  
**Stack:** PostgreSQL recomendado

### Tareas:

- [ ] **9.1** Instalar Postgres localmente
  ```bash
  # macOS
  brew install postgresql
  brew services start postgresql
  
  # Linux
  sudo apt install postgresql postgresql-contrib
  ```

- [ ] **9.2** Crear base de datos
  ```sql
  CREATE DATABASE cafeteria_ebenezer;
  CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    producto VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    notas TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    texto TEXT NOT NULL,
    calificacion INT DEFAULT 5,
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **9.3** Migrar backend a Postgres
  - Instalar: `npm install pg sequelize` o `npm install pg knex`
  - Reemplazar `/src/utils/dataManager.js`
  - Actualizar rutas para usar queries SQL
  - Testing exhaustivo

### Salida esperada:
✅ Datos en Postgres (más seguro/escalable)  
✅ Queries optimizadas  
✅ Backups automáticos habilitados

---

## 📌 Fase 10: Notificaciones (2 horas)

**Estado:** Pendiente  
**Bloqueador:** Admin panel debe estar listo  

### Opciones:

**A) Email (Recomendado)**
- Instalar: `npm install nodemailer`
- Provider: SendGrid o Gmail SMTP
- Evento: Cuando se crea pedido → Email a admin
- Evento: Cuando se aprueba opinión → Email a cliente

**B) SMS (Opcional)**
- Instalar: `npm install twilio`
- Evento: Cuando se confirma pedido → SMS a cliente

**C) Push Notifications (Futuro)**
- Instalar: `npm install web-push`
- Requiere que sea PWA

### Tareas:

- [ ] **10.1** Configurar Email
  ```bash
  # .env
  EMAIL_PROVIDER=sendgrid
  SENDGRID_API_KEY=xxx
  ADMIN_EMAIL=admin@cafeteriaebenezer.site
  ```

- [ ] **10.2** Agregar handlers en rutas
  - POST /api/pedidos → enviar email a admin
  - PATCH /api/resenas/:id → enviar email a cliente

- [ ] **10.3** Testing
  - Crear pedido, verificar email
  - Aprobar opinión, verificar email

### Salida esperada:
✅ Admin recibe notificación de pedidos nuevos  
✅ Clientes reciben confirmación de opinión  
✅ Sin overload de emails

---

## 📌 Fase 11: Pagos / Integración (4 horas)

**Estado:** Pendiente  
**Bloqueador:** Todo anterior debe estar listo  

### Opciones:

**A) Stripe (Recomendado)**
- Instalar: `npm install stripe`
- Crear cuenta: https://stripe.com
- Implementar checkout en frontend
- Validar pagos en backend

**B) PayPal**
- Integración similar a Stripe
- Más conocido en España

### Tareas:

- [ ] **11.1** Crear cuenta de pagos
  - Stripe: Verificar negocio
  - Conectar cuenta bancaria española

- [ ] **11.2** Backend + API
  - POST `/api/payments/intent` — crear intent de pago
  - POST `/api/payments/confirm` — confirmar pago
  - Webhook para confirmar pagos

- [ ] **11.3** Frontend
  - Carrito de compra (más un artículo)
  - Integración Stripe.js
  - Confirmación visual

### Salida esperada:
✅ Clientes pueden pagar online  
✅ Dinero va a cuenta del negocio  
✅ Pedidos se crean automáticamente tras pago

---

## 📌 Fase 12: Analytics & Dashboard (2 horas)

**Estado:** Pendiente  
**Bloqueador:** Pagos deben estar activos (opcional)  

### Tareas:

- [ ] **12.1** Agregar Google Analytics
  ```html
  <!-- En index.html -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  </script>
  ```

- [ ] **12.2** Dashboard de admin
  - Gráficos: pedidos por día
  - Gráficos: productos populares
  - Estadísticas: ingresos totales
  - Filtros por fecha

- [ ] **12.3** Reportes CSV
  - Descargar pedidos en CSV
  - Descargar opiniones en CSV

### Salida esperada:
✅ Admin puede ver métricas  
✅ Tendencias visibles  
✅ Reportes exportables

---

## 📌 Fase 13: Mejoras UX/UI (3 horas)

**Estado:** Pendiente  
**Bloqueador:** Sistema base debe estar estable  

### Tareas:

- [ ] **13.1** Página de Menú Completo
  - Categorías (Bocadillos, Pizzas, Postres, Bebidas)
  - Precios y fotos
  - Filtros y búsqueda
  - Disponibilidad

- [ ] **13.2** Carrito de Compra
  - Agregar múltiples artículos
  - Actualizar cantidades
  - Ver total
  - Checkout

- [ ] **13.3** Historial de Pedidos
  - Cliente ingresa teléfono
  - Ve sus pedidos anteriores
  - Ver estado en tiempo real

- [ ] **13.4** Diseño Responsivo Avanzado
  - Mejorar mobile experience
  - Agregar dark mode (opcional)
  - Animaciones más pulidas

### Salida esperada:
✅ Experiencia de usuario mejorada  
✅ Más funcionalidades visibles  
✅ Conversión aumentada

---

## 📌 Fase 14: Seguridad Avanzada (2 horas)

**Estado:** Pendiente  
**Bloqueador:** Base de datos debe estar lista  

### Tareas:

- [ ] **14.1** HTTPS/SSL
  - ✅ Ya implementado en Hostinger

- [ ] **14.2** Sanitización de Inputs
  - Instalar: `npm install xss sanitize-html`
  - Limpiar todos los inputs

- [ ] **14.3** Rate Limiting Avanzado
  - ✅ Ya implementado en `/src/middleware/rateLimiter.js`
  - Ajustar límites según carga

- [ ] **14.4** Bug Bounty / Seguridad
  - Verificar vulnerabilidades: `npm audit`
  - Usar helmet.js: `npm install helmet`
  - OWASP checklist

### Salida esperada:
✅ Sitio seguro contra ataques comunes  
✅ Datos protegidos  
✅ Compliance con estándares

---

## 🎯 Timeline Sugerido

```
HOY (Día 1): ✅ Backend + Frontend Base → Commit 8221a08
Mañana (Día 2): GitHub + Hostinger Deploy (3 horas)
           → Autenticación Admin (3 horas)
Día 3-4: Base de datos real (2 horas)
         → Notificaciones (2 horas)
         → Pagos (4 horas)
Día 5: Live en Hostinger 🚀
       → Iteraciones basadas en clientes
```

## 📞 Contacto y Soporte

- **Documentación:** LEE TODOS LOS .md en la raíz
- **Testing:** Sigue [TESTING.md](./TESTING.md)
- **API Ref:** Ver [API.md](./API.md)
- **Frontend:** Ver [FRONTEND.md](./FRONTEND.md)
- **Deploy:** Ver [HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md)

## ✨ Resumen del Progreso

| Fase | Tarea | Estado | Fecha |
|---|---|---|---|
| 1 | Infraestructura backend | ✅ | 2026-03-09 |
| 2 | Verificación backend | ✅ | 2026-03-09 |
| 3 | Cleanup y commit | ✅ | 2026-03-09 |
| 4 | Frontend HTML/CSS/JS | ✅ | 2026-03-09 |
| 5 | Documentación | ✅ | 2026-03-09 |
| 6 | GitHub push | 🔄 | Mañana |
| 7 | Deploy Hostinger | 🔄 | Mañana (2h) |
| 8 | Autenticación | 📋 | Día 2-3 |
| 9 | DB real | 📋 | Día 3 |
| 10 | Notificaciones | 📋 | Día 3-4 |
| 11 | Pagos | 📋 | Día 4-5 |
| 12 | Analytics | 📋 | Día 5 |
| 13 | UX/UI avanzado | 📋 | Día 6+ |
| 14 | Seguridad | 📋 | Día 6+ |

**Legend:** ✅ Completado | 🔄 En progreso | 📋 Pendiente

---

**Última actualización:** 2026-03-09  
**Próxima revisión:** 2026-03-10
