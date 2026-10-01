import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './Header';

// Metadatos de las historias para el componente Header (organismo)
const meta = {
  component: Header,
  tags: ['ai-generated'],
  args: {
    onLogin: () => {},
    onLogout: () => {},
    onCreateAccount: () => {},
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Estado con el usuario logueado
export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

// Estado sin usuario logueado
export const LoggedOut: Story = {};
