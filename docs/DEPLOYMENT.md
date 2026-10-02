# Guía de despliegue del entorno de diseño y UX

Esta guía explica cómo llevar el entorno de trabajo definido en `storybook-test` a un cliente concreto. Está escrita para ser usable tanto por personas como por agentes de IA.

## Objetivo

Desplegar un entorno donde el equipo de diseño y producto pueda:

- Ver y probar componentes de forma aislada.
- Construir prototipos rápidos de páginas, formularios y flujos.
- Documentar el sistema de diseño a dos niveles: humano e IA.
- Generar nuevas interfaces respetando los tokens, componentes y reglas definidas.

---

## Fase 1: Reconocimiento del entorno del cliente

Antes de tocar código, recopila esta información:

| Pregunta | ¿Por qué importa? |
|---|---|
| ¿Qué framework usa el cliente? (React, Vue, Angular, Svelte, etc.) | Determina la librería UI y la estructura base. |
| ¿Usa TypeScript o JavaScript? | Afecta la configuración y los tipos. |
| ¿Cuál es su build tool? (Vite, Webpack, Next.js, Nuxt, Angular CLI...) | Storybook y los tests se configuran de forma diferente. |
| ¿Dónde aloja el código? (GitHub, GitLab, Bitbucket, Azure DevOps...) | Decide flujo de CI/CD y permisos. |
| ¿Dónde despliega frontends? (Vercel, Netlify, GitHub Pages, Cloudflare Pages, AWS, Azure...) | Determina cómo publicar Storybook. |
| ¿Tiene un design system actual en Figma, Sketch o Adobe XD? | Puede exportarse o usarse como referencia visual. |
| ¿Tiene requisitos de accesibilidad específicos? (WCAG 2.1 AA, normativa...) | Define las reglas y tests de a11y. |
| ¿Quién usará Storybook? (diseñadores, desarrolladores, producto, clientes externos...) | Define permisos y nivel de detalle de la documentación. |

### Prompt para IA de reconocimiento

> "El cliente usa [framework] con [build tool]. Su código está en [plataforma Git]. Despliegan frontends en [plataforma hosting]. Necesitamos adaptar el entorno de diseño de `storybook-test` a su stack. Dime qué librería UI equivalente a Ant Design deberíamos usar, cómo configurar Storybook, dónde publicarlo y qué tests de accesibilidad aplicar."

---

## Fase 2: Preparar el repositorio

### Opción A: partir de `storybook-test` como plantilla

1. Clonar o duplicar el repositorio `storybook-test`.
2. Renombrar el proyecto en `package.json`.
3. Limpiar componentes de ejemplo que no sean relevantes para el cliente.
4. Conservar:
   - `src/theme.ts`
   - Estructura atómica de carpetas.
   - Configuración base de Storybook.
   - Tests de ejemplo.
   - `AGENTS.md` y esta guía.

### Opción B: crear un repositorio nuevo e importar solo lo necesario

1. Crear repositorio vacío en la plataforma del cliente.
2. Copiar:
   - `.storybook/`
   - `src/theme.ts`
   - `src/components/` (como referencia)
   - `docs/`
   - `AGENTS.md`
   - Configuración de tests.
3. Instalar dependencias según el stack del cliente.

### Prompt para IA de preparación de repo

> "Crea un nuevo repositorio en [GitHub/GitLab/...] llamado [nombre-del-cliente]-design-system. Copia la estructura atómica, los tokens de `src/theme.ts`, la configuración de Storybook y los documentos `AGENTS.md` y `docs/DEPLOYMENT.md` del proyecto `storybook-test`. Adapta `package.json` al nuevo nombre."

---

## Fase 3: Adaptar el stack del cliente

### 3.1 Framework y librería UI

| Stack del cliente | Librería UI recomendada | Equivalente a Ant Design |
|---|---|---|
| React | Ant Design, Material UI, shadcn/ui, Chakra UI | Ant Design |
| Vue 3 | Element Plus, Vuetify, Naive UI | Element Plus |
| Angular | Angular Material, NG-ZORRO | NG-ZORRO |
| Svelte | Carbon Components Svelte, Melt UI | Carbon |
| Solid | Kobalte, Hope UI | Kobalte |

### 3.2 Instalación de Storybook

Storybook soporta la mayoría de frameworks. Comando base:

```bash
npx storybook@latest init
```

Sigue las instrucciones interactivas según el framework detectado.

### 3.3 Migrar tokens

1. Abrir `src/theme.ts` del proyecto base.
2. Extraer colores, tipografía, espaciado, radios, sombras.
3. Crear el equivalente en el nuevo stack:
   - React + Ant Design: `ConfigProvider` con `theme`.
   - React + Material UI: `createTheme`.
   - Vue + Element Plus: variables CSS o configuración de tema.
   - Angular Material: paletas de color personalizadas.

### 3.4 Recrear wrappers atómicos

Para cada componente base necesario (Button, Input, Select, Card, Table...):

1. Crear un wrapper en el nivel atómico correspondiente.
2. Aplicar tokens del cliente.
3. Crear historia/documentación equivalente.
4. Ejecutar tests para verificar que renderiza.

### Prompt para IA de adaptación de stack

> "Adapta el entorno de diseño al stack del cliente: [framework] + [librería UI]. Toma los tokens de `src/theme.ts`, crea wrappers atómicos para Button, Input, Select, Card y Table usando la librería UI del cliente, y configura Storybook para ese framework. Verifica que todo renderice y pase los tests."

---

## Fase 4: Configurar Storybook y desplegarlo

### 4.1 Storybook en desarrollo

```bash
npm run storybook
```

Accesible en `http://localhost:6006`.

### 4.2 Build estático de Storybook

```bash
npm run build-storybook
```

Genera una carpeta `storybook-static/` lista para publicar.

### 4.3 Opciones de despliegue

| Plataforma | Pasos |
|---|---|
| **Vercel** | Importar repo → Framework preset: Other → Build command: `npm run build-storybook` → Output directory: `storybook-static` |
| **Netlify** | Build command: `npm run build-storybook` → Publish directory: `storybook-static` |
| **GitHub Pages** | Usar GitHub Actions para hacer build y subir a `gh-pages` |
| **Cloudflare Pages** | Build command: `npm run build-storybook`, output `storybook-static` |
| **AWS S3 / Azure / Hosting propio** | Subir contenido de `storybook-static/` al bucket o servidor |

### 4.4 URL pública o privada

- Si Storybook es para uso interno: configurar acceso restringido (Vercel Teams, Netlify Identity, VPN, etc.).
- Si es para clientes externos: publicar en URL pública o proteger con contraseña.

### Prompt para IA de despliegue

> "Configura el despliegue automático de Storybook en [Vercel/Netlify/GitHub Pages/...] para el repositorio [URL del repo]. El build command debe ser `npm run build-storybook` y el directorio de salida `storybook-static`. Genera el archivo de configuración necesario (vercel.json, netlify.toml o GitHub Actions)."

---

## Fase 5: Configurar tests y CI/CD

### 5.1 Tests mínimos recomendados

- Revisión de tipos: `tsc --noEmit`.
- Tests de componentes: Storybook + Vitest o Testing Library.
- Tests end-to-end: Playwright o Cypress para flujos críticos.
- Accesibilidad: axe-core, Storybook a11y addon, Lighthouse CI.

### 5.2 GitHub Actions de ejemplo

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx vitest --project storybook run
      - run: npx playwright test
```

### 5.3 Lighthouse CI (opcional)

Añadir `.github/workflows/lighthouse.yml` para verificar accesibilidad, rendimiento y SEO en cada push.

### Prompt para IA de CI/CD

> "Configura un pipeline de CI/CD en [GitHub Actions/GitLab CI/...] que ejecute: instalación de dependencias, revisión de tipos, tests de Storybook, tests end-to-end con Playwright y un reporte de accesibilidad con Lighthouse. Escribe el archivo de configuración."

---

## Fase 6: Documentar el sistema de diseño

### 6.1 Para humanos

Crear en `docs/human/`:

```
docs/human/
  foundations/
    colors.md
    typography.md
    spacing.md
    accessibility.md
  components/
    button.md
    input.md
    table.md
  templates/
    dashboard.md
    shipment-form.md
    login-page.md
```

Cada archivo debe incluir:
- Qué es y para qué sirve.
- Cómo usarlo.
- Variantes y estados.
- Ejemplos de código.
- Reglas de accesibilidad.

### 6.2 Para IA

Crear en `docs/ai/`:

```
docs/ai/
  AGENTS.md
  rules.md
  prompts.md
```

`AGENTS.md` debe incluir:
- Stack del cliente.
- Librerías permitidas.
- Estructura de carpetas.
- Reglas de construcción.
- Cómo testear.
- Decisiones que requieren aprobación humana.

### 6.3 Tokens exportables

Crear `tokens/tokens.json` con formato neutral (por ejemplo, compatible con Style Dictionary o Tokens Studio) para que humanos e IA puedan leerlos:

```json
{
  "color": {
    "primary": { "value": "#26acba", "type": "color" },
    "text": { "value": "#485463", "type": "color" }
  },
  "fontFamily": {
    "base": { "value": "Avenir Next, Montserrat, Inter, sans-serif", "type": "fontFamily" }
  }
}
```

### Prompt para IA de documentación

> "Genera la documentación humana e IA para el componente [Nombre] en el sistema de diseño del cliente. Incluye: descripción, variantes, uso, ejemplo de código, reglas de accesibilidad y un resumen para IA en `docs/ai/rules.md`."

---

## Fase 7: Entregar y formar al equipo

### 7.1 Entregables mínimos

- Repositorio configurado con Storybook.
- URL pública o privada de Storybook.
- Documentación en `docs/`.
- CI/CD con tests.
- `AGENTS.md` actualizado para el stack del cliente.

### 7.2 Formación del equipo

Sesiones cortas para:
- Cómo abrir Storybook y navegar historias.
- Cómo crear un nuevo componente con su historia.
- Cómo proponer cambios vía pull request.
- Cómo revisar accesibilidad.
- Cómo usar prompts de IA para generar prototipos.

### 7.3 Mantenimiento

- Revisar tokens cada vez que cambie la identidad visual del cliente.
- Actualizar componentes conforme crece el producto.
- Añadir reglas a `docs/ai/rules.md` cuando surjan nuevos patrones.

---

## Checklist final de despliegue

- [ ] Se conoce el stack del cliente.
- [ ] Se ha creado o duplicado el repositorio.
- [ ] Se han migrado los tokens al nuevo stack.
- [ ] Se han recreado los componentes atómicos base.
- [ ] Storybook se ejecuta en local.
- [ ] Storybook se despliega en la plataforma elegida.
- [ ] Hay tests automáticos funcionando.
- [ ] Se ha configurado CI/CD.
- [ ] La documentación humana e IA está creada.
- [ ] El equipo sabe cómo usar y mantener el entorno.

---

## Anexo: prompts reutilizables para agentes de IA

### Prompt 1: crear un componente nuevo

> "En el proyecto [nombre del cliente]-design-system, crea un componente [Nombre] como [átomo/molécula/organismo] usando [librería UI]. Sigue los tokens de `src/theme.ts`, la estructura atómica y las reglas de `docs/ai/rules.md`. Crea su historia en Storybook y verifica que pase `npx tsc --noEmit` y los tests de Storybook."

### Prompt 2: crear un prototipo de página

> "Crea un prototipo de [página/formulario/flujo] para el cliente [nombre]. Usa componentes atómicos existentes del sistema de diseño. Colócalo en `src/templates/` o `src/pages/` y añade una historia en Storybook para que el equipo pueda revisarlo."

### Prompt 3: revisión de accesibilidad

> "Revisa los componentes en `src/components/` y el showcase de Storybook en busca de problemas de accesibilidad según WCAG 2.1 AA. Corrige los que encuentres y actualiza `docs/human/foundations/accessibility.md` con las reglas aprendidas."

### Prompt 4: migrar a otro stack

> "El cliente ha cambiado su stack a [framework] con [librería UI]. Migra el sistema de diseño conservando los tokens, la estructura atómica y las historias. Actualiza `AGENTS.md`, `docs/DEPLOYMENT.md` y los tests."

---

*Guía generada para humanos e IA. Actualizar con las particularidades de cada cliente.*
