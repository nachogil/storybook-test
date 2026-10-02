# Guía para agentes de IA — storybook-test

Este documento es el punto de partida para cualquier agente de IA que trabaje en este proyecto. Léelo antes de tocar código.

## 1. Propósito del proyecto

Este repositorio es un **laboratorio de diseño y front-end** para construir un sistema de componentes reutilizable, accesible y bien documentado. Está inspirado visualmente en [eaship.io](https://eaship.io) y usa **Ant Design** como librería base de componentes.

Objetivos:
- Tener una galería de componentes en Storybook.
- Organizar los componentes con **Atomic Design**.
- Documentar y testear el sistema de diseño.
- Permitir prototipado rápido de templates, páginas, formularios y flujos.

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Librería UI | Ant Design |
| Estilos | Tailwind CSS v4 + tokens propios en `src/theme.ts` |
| Galería de componentes | Storybook 10 |
| Tests de componentes | Vitest (modo browser con Playwright) |
| Tests end-to-end | Playwright |
| Accesibilidad | Storybook a11y addon |
| Control de versiones | Git + GitHub |

## 3. Cómo arrancar el entorno

Node.js no está en el PATH del sistema. Se usa una instalación local compartida:

```bash
export PATH="/Users/nachogil/Library/CloudStorage/Dropbox/nacho Dropbox/_Surf Buddy/.tools/node/bin:$PATH"
cd "/Users/nachogil/Library/CloudStorage/Dropbox/nacho Dropbox/_Github/storybook-test"
```

Comandos principales:

```bash
npm install              # Instalar dependencias
npm run dev              # App Vite en http://localhost:5173
npm run storybook        # Storybook en http://localhost:6006
npm run build            # Build de producción de la app
npm run build-storybook  # Build estático de Storybook
```

Tests:

```bash
npx vitest --project storybook run   # Tests de componentes en Storybook
npx playwright test                  # Tests end-to-end de la app
npx tsc --noEmit                     # Revisión de tipos
```

## 4. Estructura de carpetas

```
src/
  components/
    atoms/          # Piezas mínimas: Button, Input, Tag...
    molecules/      # Combinaciones de átomos: Card de envío, formularios simples...
    organisms/      # Bloques grandes: Header, barra lateral, tabla de envíos...
    pages/          # Páginas completas
    ui/             # Componentes base de shadcn/ui (no modificar directamente)
  showcase/         # Galerías de componentes de terceros (Ant Design, etc.)
  templates/        # Plantillas de página reutilizables (a crear en el futuro)
  theme.ts          # Tokens de color, tipografía, espaciado y tema de Ant Design
.storybook/
  preview.tsx       # Configuración global de Storybook, incluye ConfigProvider de Ant Design
  main.ts           # Dónde busca Storybook las historias
```

## 5. Sistema de diseño

Los tokens viven en `src/theme.ts`. Están basados en la web de eaship.io.

Colores principales:
- `primary`: `#26acba` (turquesa)
- `primaryHover`: `#44cccc`
- `text`: `#485463`
- `background`: `#ffffff`
- `surface`: `#f8f9f9`
- `error`: `#EF6B51`

Tipografía:
- `Avenir Next` como fuente ideal (es de pago).
- Fallback: `Montserrat`, `Inter`, sans-serif.

El tema se aplica mediante `ConfigProvider` de Ant Design en `.storybook/preview.tsx`.

**Regla importante:** nunca hardcodees colores o fuentes en componentes. Usa siempre `src/theme.ts` o los tokens de Ant Design.

## 6. Convenciones de componentes (Atomic Design)

### Ubicación

| Nivel | Ejemplos | Carpeta |
|---|---|---|
| Átomo | Button, Input, Tag, Badge | `src/components/atoms/Nombre/` |
| Molécula | Card de envío, campo de formulario con label | `src/components/molecules/Nombre/` |
| Organismo | Header, tabla de envíos, barra de navegación | `src/components/organisms/Nombre/` |
| Página | Dashboard, login, detalle de envío | `src/components/pages/Nombre/` |
| Template | Layout de página reutilizable | `src/templates/Nombre/` |

### Archivos por componente

Cada componente debe tener al menos:

```
Nombre/
  Nombre.tsx           # Componente
  Nombre.stories.tsx   # Historia en Storybook
```

Si el componente tiene estilos propios (no de Ant Design), añade un archivo CSS o usa Tailwind.

### Nombres

- Componentes en **PascalCase**.
- Si son wrappers de Ant Design, usa el prefijo `Ant` (ej: `AntButton`, `AntShipmentCard`).
- Historias: exportar al menos `Default`.
- Meta de historias: empezar con `tags: ['ai-generated']`.

## 7. Cómo añadir un componente nuevo

1. Crear la carpeta en el nivel atómico correspondiente.
2. Crear `Nombre.tsx` con el componente.
3. Crear `Nombre.stories.tsx` con historias representativas.
4. Ejecutar `npx vitest --project storybook run` para comprobar que renderiza.
5. Ejecutar `npx tsc --noEmit` para comprobar tipos.
6. Hacer commit con un mensaje claro.

Ejemplo mínimo de historia:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AntButton } from './AntButton';

const meta = {
  component: AntButton,
  tags: ['ai-generated'],
  args: { children: 'Aceptar' },
} satisfies Meta<typeof AntButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { type: 'primary' } };
```

## 8. Testing

### Tests de componentes (Vitest + Storybook)

Se ejecutan con:

```bash
npx vitest --project storybook run
```

Cada historia se renderiza automáticamente. Si añades interacciones, usa `play` de Storybook.

### Tests end-to-end (Playwright)

Están en `e2e/`. Sirven para probar flujos reales de la app Vite. Comando:

```bash
npx playwright test
```

### Accesibilidad

- Storybook tiene activado el addon a11y.
- Antes de añadir un componente, revisa que no genere violaciones en el panel de a11y de Storybook.
- Usa roles y labels correctos (`<button>`, `label`, `aria-label`, etc.).
- Evita colores como único indicador de estado.
- Mantén contraste suficiente.

## 9. Reglas de construcción

1. **Usa Ant Design** para componentes base siempre que sea posible.
2. **No hardcodees estilos.** Usa `src/theme.ts` o los tokens de Ant Design.
3. **Organiza con Atomic Design.** Consulta la sección 6.
4. **Cada componente nuevo lleva su historia.**
5. **No subas secretos ni tokens personales** al repositorio.
6. **Escribe en español** los comentarios y mensajes de commit para mantener consistencia con el usuario.
7. **No reinstales librerías sin motivo.** Si necesitas algo nuevo, pregunta primero.
8. **Haz commits pequeños y con mensajes claros.**

## 10. Tema visual de eaship.io

El proyecto usa como referencia visual a eaship.io. Los colores y tipografía fueron extraídos de su web pública.

Si en el futuro se quiere ajustar el tema:

1. Editar `src/theme.ts`.
2. Los cambios se aplican automáticamente a todos los componentes de Ant Design gracias a `ConfigProvider`.
3. Añadir una nota en `AGENTS.md` si la decisión es importante.

## 11. Cómo extender este sistema para un agente de IA

Para que una IA genere componentes o prototipos dentro de este sistema, dale como contexto:

- Este archivo `AGENTS.md`.
- El archivo `src/theme.ts`.
- La estructura de `src/components/` como ejemplo.
- La URL o descripción de la empresa/servicio para el que se va a construir.

Prompt recomendado para pasar a otro agente:

> "Trabaja en el proyecto ubicado en `Dropbox/nacho Dropbox/_Github/storybook-test`. Lee primero `AGENTS.md`, luego `src/theme.ts` y la estructura de `src/components/`. Construye [componente/template/página] siguiendo Atomic Design, usando Ant Design, aplicando el tema de eaship.io y añadiendo su historia en Storybook. Verifica con `npx tsc --noEmit` y `npx vitest --project storybook run` antes de entregar."

## 12. Contacto y decisiones importantes

Este proyecto es de aprendizaje y prototipado. Antes de:
- Cambiar de librería UI (por ejemplo, dejar Ant Design).
- Reorganizar la estructura de carpetas.
- Subir datos sensibles.
- Borrar el historial de Git.

Consulta al usuario.

---

*Documento generado para agentes de IA. Mantener actualizado si cambian las reglas, el stack o el sistema de diseño.*
