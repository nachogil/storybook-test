import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para tests end-to-end.
 *
 * Arranca automáticamente el servidor de desarrollo de Vite
 * y abre la app en Chromium para probar los flujos de usuario.
 */
export default defineConfig({
  // Carpeta donde viven los tests E2E
  testDir: './e2e',

  // Ejecuta todos los tests en paralelo si es posible
  fullyParallel: true,

  // En CI evita que se queden tests "only" por error
  forbidOnly: !!process.env.CI,

  // Reintentos en CI para evitar falsos negativos
  retries: process.env.CI ? 2 : 0,

  // Trabajadores: en CI mejor uno para evitar conflictos
  workers: process.env.CI ? 1 : undefined,

  // Formato de resultado en la terminal
  reporter: 'list',

  // Configuración compartida para todos los tests
  use: {
    // URL base de la app que arranca el webServer
    baseURL: 'http://localhost:5173',
    // Guarda traza solo si falla el primer intento
    trace: 'on-first-retry',
  },

  // Navegadores en los que se ejecutan los tests
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Arranca el servidor de Vite automáticamente antes de los tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
