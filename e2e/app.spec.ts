import { test, expect } from '@playwright/test';

/**
 * Tests end-to-end de los flujos principales de la app.
 *
 * Estos tests abren la aplicación como la vería un usuario real
 * y comprueban que se puede interactuar con ella.
 */

test.describe('Página principal', () => {
  // Antes de cada test abrimos la página de inicio
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('muestra el título principal', async ({ page }) => {
    // Buscamos el encabezado con el texto "Get started"
    const titulo = page.getByRole('heading', { name: /get started/i });
    await expect(titulo).toBeVisible();
  });

  test('el contador aumenta al hacer clic', async ({ page }) => {
    const boton = page.getByTestId('counter-button');

    // Estado inicial
    await expect(boton).toHaveText('Count is 0');

    // Hacemos clic y comprobamos que sube
    await boton.click();
    await expect(boton).toHaveText('Count is 1');

    // Otro clic para confirmar
    await boton.click();
    await expect(boton).toHaveText('Count is 2');
  });

  test('los enlaces principales apuntan a Vite y React', async ({ page }) => {
    const enlaceVite = page.getByTestId('vite-link');
    await expect(enlaceVite).toHaveAttribute('href', 'https://vite.dev/');

    const enlaceReact = page.getByTestId('react-link');
    await expect(enlaceReact).toHaveAttribute('href', 'https://react.dev/');
  });
});
