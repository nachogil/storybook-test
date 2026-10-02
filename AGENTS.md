# Guía para agentes de IA — storybook-test

Este documento es el punto de partida para cualquier agente de IA que trabaje en este proyecto. Léelo antes de tocar código.

## 1. Propósito del proyecto

Este repositorio es un **laboratorio de diseño y front-end** para construir un sistema de componentes reutilizable, accesible y bien documentado. Está inspirado visualmente en [eaship.io](https://eaship.io).

**Importante:** el **sistema de diseño** (tokens, estructura atómica, reglas y documentación) es independiente del stack tecnológico. La implementación actual usa **React + Ant Design + Vite**, pero puede adaptarse al stack que use el cliente (React, Vue, Angular, Svelte, Node.js con otro framework, etc.).

Objetivos:
- Tener una galería de componentes en Storybook u otra herramienta equivalente.
- Organizar los componentes con **Atomic Design**.
- Documentar y testear el sistema de diseño.
- Permitir prototipado rápido de templates, páginas, formularios y flujos.
- Ser portable a distintos entornos tecnológicos según el cliente.

## 2. Stack tecnológico actual

Este es el stack de la implementación de referencia. El sistema de diseño puede migrarse a otros stacks.

| Capa | Tecnología actual | Alternativas válidas |
|---|---|---|
| Framework | React 19 + TypeScript | Vue, Angular, Svelte, Solid, Next.js, Nuxt, Astro... |
| Build tool | Vite | Webpack, Parcel, Create React App, Vue CLI, Angular CLI... |
| Librería UI | Ant Design | Material UI, shadcn/ui, Chakra UI, Bootstrap, Element Plus, Vuetify... |
| Estilos | Tailwind CSS v4 + tokens en `src/theme.ts` | CSS Modules, Styled Components, SCSS, Less, PostCSS... |
| Galería de componentes | Storybook 10 | Ladle, Histoire, Styleguidist, Docusaurus... |
| Tests de componentes | Vitest (modo browser con Playwright) | Jest, Testing Library, Cypress Component Testing... |
| Tests end-to-end | Playwright | Cypress, Selenium, Puppeteer... |
| Accesibilidad | Storybook a11y addon | axe-core, eslint-plugin-jsx-a11y, Lighthouse CI... |
| Control de versiones | Git + GitHub | GitLab, Bitbucket... |

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

En la implementación actual, el tema se aplica mediante `ConfigProvider` de Ant Design en `.storybook/preview.tsx`. En otro framework se adapta a su sistema equivalente.

**Regla importante:** nunca hardcodees colores o fuentes en componentes. Usa siempre `src/theme.ts` o el sistema de tokens del stack elegido.

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

Si el componente tiene estilos propios (no de la librería UI), añade un archivo CSS o usa Tailwind.

### Nombres

- Componentes en **PascalCase**.
- Si son wrappers de Ant Design, usa el prefijo `Ant` (ej: `AntButton`, `AntShipmentCard`). Si el stack cambia, adapta el prefijo a la librería usada.
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

1. **Usa una librería UI establecida** para componentes base siempre que sea posible (Ant Design, Material UI, shadcn/ui, etc.).
2. **No hardcodees estilos.** Usa `src/theme.ts` o el sistema de tokens del stack elegido.
3. **Organiza con Atomic Design.** Consulta la sección 6.
4. **Cada componente nuevo lleva su historia** (o su equivalente en la herramienta de documentación usada).
5. **No subas secretos ni tokens personales** al repositorio.
6. **Escribe en español** los comentarios y mensajes de commit para mantener consistencia con el usuario.
7. **No reinstales librerías sin motivo.** Si necesitas algo nuevo, pregunta primero.
8. **Haz commits pequeños y con mensajes claros.**
9. **Antes de cambiar de stack o librería UI**, consulta al usuario y actualiza este documento.

## 10. Tema visual de eaship.io

El proyecto usa como referencia visual a eaship.io. Los colores y tipografía fueron extraídos de su web pública.

Si en el futuro se quiere ajustar el tema:

1. Editar `src/theme.ts`.
2. Los cambios se aplican a los componentes de Ant Design gracias a `ConfigProvider`.
3. Añadir una nota en `AGENTS.md` si la decisión es importante.
4. Si cambia el stack, migrar los tokens al formato que entienda la nueva librería.

## 11. Portabilidad del sistema de diseño

El sistema de diseño puede moverse a otro stack. Esto es lo que debe conservarse:

- `src/theme.ts` o su equivalente en formato JSON/YAML.
- La estructura atómica de carpetas (`atoms/`, `molecules/`, `organisms/`, `pages/`, `templates/`).
- Las reglas de construcción y accesibilidad.
- La documentación humana e IA.

### Cómo adaptar el sistema a otro stack

| Si el cliente usa... | Acción recomendada |
|---|---|
| **React con otra librería** | Reemplazar Ant Design por Material UI, shadcn/ui, Chakra, etc. Mantener `src/theme.ts` y wrappers atómicos. |
| **Vue** | Migrar a Vue 3 + TypeScript. Usar librerías tipo Element Plus, Vuetify o Quasar. Adaptar Storybook a Vue. |
| **Angular** | Migrar a Angular + TypeScript. Usar Angular Material o NG-ZORRO (que es Ant Design para Angular). |
| **Svelte / Solid** | Usar SvelteKit/SolidStart + librería UI compatible o CSS puro. |
| **Node.js con backend** | El sistema de diseño aplica al frontend. El backend puede ser cualquier tecnología. |

### Pasos para migrar a otro stack

1. **Conservar los tokens**: extraer colores, tipografía, espaciado y radios de `src/theme.ts`.
2. **Elegir librería UI** equivalente en el nuevo stack.
3. **Recrear wrappers atómicos** usando la nueva librería, manteniendo nombres y props similares.
4. **Recrear historias** en la herramienta de documentación correspondiente.
5. **Adaptar tests** al nuevo entorno de testing.
6. **Actualizar `AGENTS.md`** con el nuevo stack y librerías.

## 12. Cómo extender este sistema para un agente de IA

Para que una IA genere componentes o prototipos dentro de este sistema, dale como contexto:

- Este archivo `AGENTS.md`.
- El archivo `src/theme.ts`.
- La estructura de `src/components/` como ejemplo.
- La URL o descripción de la empresa/servicio para el que se va a construir.
- El stack tecnológico del cliente, si es diferente al actual.

Prompt recomendado para pasar a otro agente:

> "Trabaja en el proyecto ubicado en `Dropbox/nacho Dropbox/_Github/storybook-test`. Lee primero `AGENTS.md`, luego `src/theme.ts` y la estructura de `src/components/`. El stack actual de referencia es React + Ant Design + Vite, pero el sistema de diseño debe poder adaptarse al stack del cliente. Construye [componente/template/página] siguiendo Atomic Design, usando la librería UI indicada por el cliente, aplicando el tema de eaship.io y añadiendo su historia/documentación. Verifica con `npx tsc --noEmit` y `npx vitest --project storybook run` antes de entregar."

## 13. Contacto y decisiones importantes

Este proyecto es de aprendizaje y prototipado. Antes de:
- Cambiar de stack tecnológico (React, Vue, Angular, etc.).
- Cambiar de librería UI.
- Reorganizar la estructura de carpetas.
- Subir datos sensibles.
- Borrar el historial de Git.

Consulta al usuario.

---

*Documento generado para agentes de IA. Mantener actualizado si cambian las reglas, el stack o el sistema de diseño.*
