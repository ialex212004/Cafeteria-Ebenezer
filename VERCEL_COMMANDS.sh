#!/bin/bash
# ============================================================
# VERCEL DEPLOYMENT - COMMANDS SEQUENCE
# ============================================================
# Copia y pega cada línea en orden

# PASO 1: Preparar cambios para Git
cd /workspaces/Cafeteria-Ebenezer
git status

# PASO 2: Agregar archivos Vercel
git add api/index.js vercel.json private/.env.vercel.example .gitignore package.json

# PASO 3: Crear commit descriptivo
git commit -m "🚀 Vercel deployment: serverless backend + static frontend

- Created /api/index.js: Serverless Express function
- Added vercel.json: Routes and build configuration
- Updated .gitignore: Added Vercel exclusions
- Updated package.json: Added vercel scripts
- Added private/.env.vercel.example: Environment template"

# PASO 4: Verificar que estás en main
git branch

# PASO 5: Push a GitHub
git push -u origin main

# ============================================================
# EN TU NAVEGADOR:
# ============================================================
# PASO 6: Login en GitHub (si es necesario): https://github.com/login
# PASO 7: Verifica que el push llegó a: https://github.com/ialex212004/Cafeteria-Ebenezer

# ============================================================
# AHORA EN TERMINAL (después del git push):
# ============================================================

# PASO 8: Instalar Vercel CLI
npm install -g vercel

# PASO 9: Login en Vercel
vercel login
# → Selecciona GitHub
# → Autoriza en navegador

# PASO 10: Deploy a Vercel (desde /workspaces/Cafeteria-Ebenezer)
vercel
# Responde:
# Set up and deploy? → y
# Which scope? → [Tu nombre de GitHub]
# Link to existing project? → n
# What's your project's name? → cafeteria-ebenezer
# In which directory is your code? → ./
# Want to override the settings above? → n

# ============================================================
# RESULTADO:
# ============================================================
# Tu sitio estará en: https://cafeteria-ebenezer.vercel.app
# Dashboard: https://vercel.com/dashboard

# ============================================================
# FUTUROS DEPLOYMENTS (automático):
# ============================================================
# Solo haz: git push origin main
# ¡Vercel deploya automáticamente en ~30 segundos!
