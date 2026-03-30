# 🌐 Plan de Deploy en Hostinger — Cafetería Ebenezer

**Proveedor**: Hostinger Node.js Hosting
**Repositorio**: GitHub (ialex212004/Cafeteria-Ebenezer)
**Dominio**: A configurar en Hostinger
**BD**: JSON en /data (después migrar a PostgreSQL)

---

## 📋 FLUJO EN HOSTINGER

```
TÚ (Codificando)
     ↓
GitHub (hacer push)
     ↓
Hostinger (webhook automático)
     ↓
Deploy automático
     ↓
www.cafeteria-ebenezer.com (online)
```

---

## ✅ LO QUE YA ESTÁ LISTO PARA HOSTINGER

```
✅ Code en GitHub (próximo step)
✅ package.json con "start" script
✅ private/.env.example configurado
✅ PORT 3000 en config
✅ Express sirviendo archivos estáticos
✅ API rest completamente funcional
```

---

## ⚠️ LO QUE FALTA ANTES DE PUSH A HOSTINGER

### 1. **Limpiar datos de prueba**
```bash
echo "[]" > data/pedidos.json
echo "[]" > data/resenas.json
```

### 2. **Añadir a Git (gitignore correctamente)**
```bash
git add .
git commit -m "feat: Backend profesional con validación y logging"
git push origin main
```

### 3. **Variables de entorno para Hostinger**
En el panel de Hostinger → Variables de entorno:
```
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
JWT_SECRET=<generar-32-caracteres-aleatorios>
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔧 PASOS EN HOSTINGER (Paso a Paso)

### **PASO 1: Conectar GitHub a Hostinger**
```
1. Ir a panel.hostinger.com
2. Node.js → Crear aplicación Node.js
3. "Conectar con GitHub"
4. Autorizar Hostinger en GitHub
5. Seleccionar repositorio: Cafeteria-Ebenezer
6. Rama: main
```

### **PASO 2: Configurar comandos**
```
Build command:     npm install
Start command:     npm start
Directorio:        / (raíz del proyecto)
Puerto:            3000 (automático)
```

### **PASO 3: Variables de entorno**
```
En el panel:
- Variables → Agregar todas las del private/.env.example
- Pero VALORES REALES (no ejemplo)
- JWT_SECRET: generar con openssl rand -base64 32
```

### **PASO 4: Dominio**
```
1. Comprar dominio en Hostinger
2. DNS apuntando a Node.js app
3. SSL automático (Let's Encrypt)
4. HTTPS forzado
```

### **PASO 5: Logs**
```
En panel: Logs → Ver output del servidor
- Buscar errores
- Verificar que inicia correctamente
- Ver request logs
```

---

## 📊 CHECKLIST ANTES DE DEPLOY

| Paso | Qué hacer | Verificar |
|------|-----------|-----------|
| 1 | Limpiar datos prueba | `data/pedidos.json = []` |
| 2 | Commit final a main | Git log muestra último commit |
| 3 | GitHub actualizado | Ver código en github.com |
| 4 | Hostinger conectado | App creada en panel |
| 5 | Env vars configuradas | 8+ variables en panel |
| 6 | Deploy iniciado | Logs sin errores |
| 7 | Dominio configurado | SSL activo en logs |
| 8 | HTTPS funcionando | Site abre en navegador |

---

## 🚨 PROBLEMA COMÚN EN HOSTINGER

**Problema**: App inicia pero da error en navegador
**Causa usual**: 
- Variables de entorno no configuradas
- Puerto incorrecto
- Dominio no apuntando correctamente

**Solución**:
1. Verificar logs en Hostinger
2. Revisar variables de entorno
3. Hacer SSH: `npm start` local
4. Contactar soporte Hostinger

---

## 📝 RESUMEN: ANTES DE SIGUIENTE STEP

**Antes de empezar frontend/tests:**

1. ✅ Backend funcionando localmente (HECHO)
2. ✅ Código limpio y sin datos prueba (HACER)
3. ⏳ Subir a GitHub (PRÓXIMO)
4. ⏳ Conectar Hostinger (DESPUÉS)
5. ⏳ Deploy automático (DESPUÉS)

---

## 🎯 MIS RECOMENDACIONES HOSTINGER

### Para esta fase:
```
✅ Usar Hostinger Node.js (recomendado)
✅ Deploy automático con GitHub
✅ Usar PostgreSQL de Hostinger (no JSON)
✅ Backups automáticos
✅ SSL gratis (Let's Encrypt)
```

### Planes recomendados:
```
💰 BÁSICO: $5.99/mes
   └─ Perfecto para MVP
   
💰 BUSINESS: $9.99/mes  
   └─ Mejor para producción real
   
💰 PREMIUM: $19.99/mes
   └─ Si esperas mucho tráfico
```

---

## ⚡ CHECKLIST HOSTINGER

Cuando llegues a eso:

- [ ] Cuenta Hostinger activa
- [ ] Repositorio GitHub conectado
- [ ] Variables de entorno configuradas
- [ ] Dominio comprado/configurado
- [ ] Primera compilación exitosa
- [ ] Logs sin errores
- [ ] Sitio accesible en navegador
- [ ] SSL/HTTPS activo
- [ ] API respondiendo en producción

---

**¿Continuamos con el siguiente step?**

A) Limpiar datos y hacer commit final
B) Crear frontend primero
C) Agregar autenticación JWT
D) Configurar Hostinger ahora

¿Cuál prefieres? 🚀
