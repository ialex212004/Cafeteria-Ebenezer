// ============================================================
//  CAFETERÍA EBENEZER — Backend Node.js / Express
//  github.com → Hostinger Node.js App
// ============================================================
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Sirve el frontend desde /public
app.use(express.static(path.join(__dirname, 'public')));

// ── Archivos de datos ─────────────────────────────────────────
const DATA_DIR     = path.join(__dirname, 'data');
const PEDIDOS_FILE = path.join(DATA_DIR, 'pedidos.json');
const RESENAS_FILE = path.join(DATA_DIR, 'resenas.json');

if (!fs.existsSync(DATA_DIR))     fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PEDIDOS_FILE)) fs.writeFileSync(PEDIDOS_FILE, '[]');
if (!fs.existsSync(RESENAS_FILE)) fs.writeFileSync(RESENAS_FILE, '[]');

// ── Helpers ───────────────────────────────────────────────────
function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return []; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ════════════════════════════════════════════════════════════
//  API — PEDIDOS
// ════════════════════════════════════════════════════════════

// POST /api/pedido — nuevo pedido desde el formulario web
app.post('/api/pedido', (req, res) => {
  const { nombre, telefono, producto, cantidad, notas } = req.body;

  if (!nombre || !telefono || !producto) {
    return res.status(400).json({ error: 'Nombre, teléfono y producto son obligatorios.' });
  }

  const pedido = {
    id:       Date.now(),
    nombre:   nombre.trim(),
    telefono: telefono.trim(),
    producto,
    cantidad: Number(cantidad) || 1,
    notas:    (notas || '').trim(),
    estado:   'pendiente',   // pendiente | confirmado | entregado
    fecha:    new Date().toISOString()
  };

  const pedidos = readJSON(PEDIDOS_FILE);
  pedidos.push(pedido);
  writeJSON(PEDIDOS_FILE, pedidos);

  console.log(`[PEDIDO NUEVO] ${pedido.nombre} — ${pedido.cantidad}x ${pedido.producto}`);
  res.status(201).json({ ok: true, pedido });
});

// GET /api/pedidos — lista todos los pedidos (más recientes primero)
app.get('/api/pedidos', (req, res) => {
  const pedidos = readJSON(PEDIDOS_FILE);
  res.json(pedidos.reverse());
});

// PATCH /api/pedido/:id — actualizar estado de un pedido
app.patch('/api/pedido/:id', (req, res) => {
  const id      = Number(req.params.id);
  const { estado } = req.body;
  const validos = ['pendiente', 'confirmado', 'entregado'];

  if (!validos.includes(estado)) {
    return res.status(400).json({ error: `Estado debe ser: ${validos.join(', ')}` });
  }

  const pedidos = readJSON(PEDIDOS_FILE);
  const idx     = pedidos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Pedido no encontrado.' });

  pedidos[idx].estado = estado;
  writeJSON(PEDIDOS_FILE, pedidos);
  res.json({ ok: true, pedido: pedidos[idx] });
});

// DELETE /api/pedido/:id — eliminar pedido
app.delete('/api/pedido/:id', (req, res) => {
  const id      = Number(req.params.id);
  const pedidos = readJSON(PEDIDOS_FILE);
  const nuevos  = pedidos.filter(p => p.id !== id);
  if (nuevos.length === pedidos.length) return res.status(404).json({ error: 'No encontrado.' });
  writeJSON(PEDIDOS_FILE, nuevos);
  res.json({ ok: true });
});

// ════════════════════════════════════════════════════════════
//  API — RESEÑAS
// ════════════════════════════════════════════════════════════

// POST /api/resena — nueva reseña desde el formulario web
app.post('/api/resena', (req, res) => {
  const { nombre, ciudad, texto } = req.body;

  if (!nombre || !texto) {
    return res.status(400).json({ error: 'Nombre y texto son obligatorios.' });
  }

  const resena = {
    id:     Date.now(),
    nombre: nombre.trim(),
    ciudad: (ciudad || '').trim(),
    texto:  texto.trim(),
    fecha:  new Date().toISOString()
  };

  const resenas = readJSON(RESENAS_FILE);
  resenas.push(resena);
  writeJSON(RESENAS_FILE, resenas);

  console.log(`[RESEÑA NUEVA] ${resena.nombre} desde ${resena.ciudad}`);
  res.status(201).json({ ok: true, resena });
});

// GET /api/resenas — lista todas las reseñas
app.get('/api/resenas', (req, res) => {
  const resenas = readJSON(RESENAS_FILE);
  res.json(resenas.reverse());
});

// DELETE /api/resena/:id — eliminar reseña
app.delete('/api/resena/:id', (req, res) => {
  const id      = Number(req.params.id);
  const resenas = readJSON(RESENAS_FILE);
  const nuevas  = resenas.filter(r => r.id !== id);
  if (nuevas.length === resenas.length) return res.status(404).json({ error: 'No encontrada.' });
  writeJSON(RESENAS_FILE, nuevas);
  res.json({ ok: true });
});

// ── Fallback SPA ──────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Arranque ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor Cafetería Ebenezer en http://localhost:${PORT}`);
});
