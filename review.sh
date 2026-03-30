#!/bin/bash

# ============================================
# 🔍 PRE-DEPLOY REVIEW SCRIPT
# ============================================
# Este script automatiza la mayoría de checks
# Uso: bash review.sh
# ============================================

set -e

echo "🔍 INICIANDO REVISIÓN PRE-DEPLOY..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Función auxiliar para tests
test_check() {
  local name=$1
  local cmd=$2
  
  if eval "$cmd" > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} $name"
    ((PASSED++))
  else
    echo -e "${RED}❌${NC} $name"
    ((FAILED++))
  fi
}

# ============================================
# SECCIÓN 1: ESTRUCTURA
# ============================================
echo "📁 VERIFICANDO ESTRUCTURA..."

test_check "Directorio src existe" "[ -d src ]"
test_check "Directorio public existe" "[ -d public ]"
test_check "Directorio data existe" "[ -d data ]"
test_check "package.json existe" "[ -f package.json ]"
test_check "server.js existe" "[ -f server.js ]"
test_check "public/index.html existe" "[ -f public/index.html ]"

echo ""

# ============================================
# SECCIÓN 2: BACKEND FILES
# ============================================
echo "⚙️  VERIFICANDO ARCHIVOS BACKEND..."

test_check "src/config/index.js" "[ -f src/config/index.js ]"
test_check "src/middleware/security.js" "[ -f src/middleware/security.js ]"
test_check "src/middleware/rateLimiter.js" "[ -f src/middleware/rateLimiter.js ]"
test_check "src/middleware/validation.js" "[ -f src/middleware/validation.js ]"
test_check "src/middleware/errorHandler.js" "[ -f src/middleware/errorHandler.js ]"
test_check "src/routes/pedidos.js" "[ -f src/routes/pedidos.js ]"
test_check "src/routes/resenas.js" "[ -f src/routes/resenas.js ]"
test_check "src/routes/health.js" "[ -f src/routes/health.js ]"
test_check "src/utils/logger.js" "[ -f src/utils/logger.js ]"
test_check "src/utils/dataManager.js" "[ -f src/utils/dataManager.js ]"
test_check "src/validators/index.js" "[ -f src/validators/index.js ]"

echo ""

# ============================================
# SECCIÓN 3: CONFIGURACIÓN
# ============================================
echo "⚙️  VERIFICANDO CONFIGURACIÓN..."

test_check ".env.example existe" "[ -f private/.env.example ]"
test_check ".gitignore existe" "[ -f .gitignore ]"
test_check ".eslintrc.json existe" "[ -f .eslintrc.json ]"
test_check ".prettierrc.json existe" "[ -f .prettierrc.json ]"

# Verificar que .gitignore contiene node_modules
test_check ".gitignore contiene node_modules" "grep -q 'node_modules' .gitignore"
test_check ".gitignore contiene .env" "grep -q '.env' .gitignore"

echo ""

# ============================================
# SECCIÓN 4: GIT
# ============================================
echo "📚 VERIFICANDO GIT..."

test_check "En rama main" "git rev-parse --abbrev-ref HEAD | grep -q main"
test_check "Working tree limpio" "git status --porcelain | wc -l | grep -q '^0$' || git status --porcelain | wc -l | grep -q '^1$'"
test_check ".env NO está en git" "! git ls-files | grep -q '\\.env$'"

echo ""

# ============================================
# SECCIÓN 5: DATA FILES
# ============================================
echo "💾 VERIFICANDO DATA FILES..."

# Verificar que son arrays vacíos
test_check "data/pedidos.json es array vacío" "cat data/pedidos.json | grep -q '\\[\\]'"
test_check "data/resenas.json es array vacío" "cat data/resenas.json | grep -q '\\[\\]'"

echo ""

# ============================================
# SECCIÓN 6: HTML FRONTEND
# ============================================
echo "🌐 VERIFICANDO FRONTEND HTML..."

test_check "Contiene <!DOCTYPE" "grep -q '<!DOCTYPE' public/index.html"
test_check "Contiene <html>" "grep -q '<html' public/index.html"
test_check "Contiene <body>" "grep -q '<body' public/index.html"
test_check "Contiene form con id='orderForm'" "grep -q 'id=\"orderForm\"' public/index.html"
test_check "Contiene form con id='reviewForm'" "grep -q 'id=\"reviewForm\"' public/index.html"
test_check "Contiene endpoint /api/pedidos" "grep -q '/api/pedidos' public/index.html"
test_check "Contiene endpoint /api/resenas" "grep -q '/api/resenas' public/index.html"
test_check "Contiene detección localhost" "grep -q 'window.location.hostname' public/index.html"

echo ""

# ============================================
# SECCIÓN 7: DOCUMENTACIÓN
# ============================================
echo "📖 VERIFICANDO DOCUMENTACIÓN..."

test_check "README.md existe" "[ -f README.md ]"
test_check "API.md existe" "[ -f API.md ]"
test_check "FRONTEND.md existe" "[ -f FRONTEND.md ]"
test_check "TESTING.md existe" "[ -f TESTING.md ]"
test_check "HOSTINGER_SETUP.md existe" "[ -f HOSTINGER_SETUP.md ]"
test_check "NEXT_STEPS.md existe" "[ -f NEXT_STEPS.md ]"
test_check "PRE_DEPLOY_REVIEW.md existe" "[ -f PRE_DEPLOY_REVIEW.md ]"

echo ""

# ============================================
# SECCIÓN 8: SECURITY CHECKS
# ============================================
echo "🛡️  VERIFICANDO SEGURIDAD..."

test_check "No hay console.log en src/" "! grep -r 'console.log' src/ | grep -v logger.js | grep -q ."

# Buscar palabras claves peligrosas
test_check "No hay 'password' hardcodeada" "! grep -ri 'password.*=' src/ | grep -v 'package' | grep -q ."
test_check "No hay 'secret' real" "! grep -ri \"secret.*[a-z0-9]{20,}\" src/ | grep -q ."

echo ""

# ============================================
# SECCIÓN 9: LINE COUNTS
# ============================================
echo "📊 CONTEO DE LÍNEAS..."

TOTAL=$(find . -type f \( -name "*.js" -o -name "*.json" -o -name "*.html" \) -not -path "./node_modules/*" | xargs wc -l | tail -1 | awk '{print $1}')
echo -e "${GREEN}ℹ️${NC}  Total de líneas: $TOTAL"

echo ""

# ============================================
# RESULTADO FINAL
# ============================================
echo "════════════════════════════════════════"
echo "📋 RESULTADO"
echo "════════════════════════════════════════"
echo -e "✅ Pasados:  ${GREEN}$PASSED${NC}"
echo -e "❌ Fallidos: ${RED}$FAILED${NC}"
echo "════════════════════════════════════════"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ TODOS LOS CHECKS PASARON${NC}"
  echo ""
  echo "🚀 Listo para:"
  echo "   1. npm start (testing manual)"
  echo "   2. git push"
  echo "   3. Hostinger deploy"
  exit 0
else
  echo -e "${RED}❌ ALGUNOS CHECKS FALLARON${NC}"
  echo ""
  echo "⚠️  Por favor revisar y fixear los problemas antes de deploying"
  exit 1
fi
