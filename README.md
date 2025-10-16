# Design Tokens en Español - Web del Curso

## Descripción

Este proyecto es la web oficial del curso "Diseño e Implementación de Design Tokens", una formación en español que enseña la metodología de Design Tokens desde la conceptualización hasta la implementación práctica en desarrollo.

## Tecnologías

- **React Router 7** - Framework de routing para React con SSR
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Bulma** - Framework CSS
- **Sass** - Preprocesador CSS
- **Style Dictionary** - Gestión de Design Tokens
- **Vite** - Build tool y bundler

## Instalación

```bash
# Instalar dependencias
npm ci

# Modo desarrollo
npm run dev

# Build de producción
npm run build

```

## Estructura del Proyecto

```
dsweb-tercera-edicion/
app/
 home/           # Componente principal de la home
 routes/         # Rutas de React Router
 root.tsx        # Layout raíz con navegación y footer
 app.scss        # Estilos globales
 texts.json      # Contenido de textos mocked
 public/             # Assets estáticos
 build.js            # Script de build con Style Dictionary
```

## Características

### Secciones

1. **Hero** - Presentación del curso con CTA
2. **Introducción** - ¿Por qué Design Tokens?
3. **Empresas** - Logos de empresas que usan Design Tokens
4. **Sesiones** - Detalle de las 12 sesiones del curso
5. **Profesores** - Información sobre los instructores
6. **Precios** - Planes disponibles (Newsletter, Curso, Asesoría)
7. **Video** - Video explicativo del curso
8. **FAQs** - Preguntas frecuentes


## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción (incluye Style Dictionary)

## Enlaces

- **Web**: [designtokens.es](https://designtokens.es)
- **Newsletter**: [Substack](https://designtokenses.substack.com)
- **LinkedIn**: [designtokens-es](https://www.linkedin.com/company/designtokens-es/)
- **Email**: hola@designtokens.es

## Licencia

© 2025 Design Tokens en Español. Todos los derechos reservados.

---
