# Seguridad — CateonCook

## Configuración aplicada (2026-05-21)

### 1. Headers HTTP (`next.config.ts`)
- `X-Frame-Options: DENY` — bloquea clickjacking
- `X-Content-Type-Options: nosniff` — previene MIME sniffing
- `X-XSS-Protection: 1; mode=block` — filtro XSS del navegador
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — deshabilita cámara, micrófono y geolocalización
- `Strict-Transport-Security` — fuerza HTTPS (2 años, incluye subdominios)
- `Content-Security-Policy` — restringe scripts, estilos, fuentes, imágenes y conexiones

### 2. Rate Limiting (`lib/supabase/proxy.ts`)
- Máximo **10 intentos por IP por minuto** en rutas de auth
- Rutas protegidas: `/login`, `/signup`, `/forgot-password`
- Responde `429` al superar el límite

### 3. Control de acceso Admin (`app/admin/page.tsx`)
- Solo el email en `ADMIN_EMAIL` (`.env.local`) puede acceder al panel
- Cualquier otro usuario autenticado es redirigido a `/`
- Admin actual: configurado en `.env.local` como `ADMIN_EMAIL`

### 4. Mensajes de error genéricos
- Login: siempre muestra "Correo o contraseña incorrectos." — evita enumerar usuarios
- Signup: mensaje genérico sin detalles internos de Supabase

### 5. Contraseña mínima
- Aumentada de 6 a **8 caracteres** en signup

---

## Variables de entorno requeridas

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave pública de Supabase |
| `ADMIN_EMAIL` | Email del único usuario con acceso al panel `/admin` |

---

## Pendiente / Mejoras futuras

- [ ] Supabase RLS policies en tabla `solicitudes`
- [ ] Rate limiting persistente (Redis) para producción multi-instancia
- [ ] Logs de auditoría en acciones del admin
- [ ] CAPTCHA en formulario de registro público
