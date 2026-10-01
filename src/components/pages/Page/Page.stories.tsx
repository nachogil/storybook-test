import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Page } from './Page';

// Metadatos de las historias para el componente Page (página)
const meta = {
  component: Page,
  tags: ['ai-generated'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Página sin usuario logueado
export const LoggedOut: Story = {};

// Página donde se hace clic en el botón de login y aparece el logout
export const LoggedIn: Story = {
  play: async ({ canvas, userEvent }) => {
    const loginButton = canvas.getByRole('button', { name: /log in/i });
    await expect(loginButton).toBeVisible();
    await userEvent.click(loginButton);
    const logoutButton = canvas.getByRole('button', { name: /log out/i });
    await expect(logoutButton).toBeVisible();
  },
};
