import type { Meta, StoryObj } from '@storybook/react-vite';

import { AntButton } from './AntButton';

// Historias para el botón atómico de Ant Design
const meta = {
  component: AntButton,
  tags: ['ai-generated'],
  args: {
    children: 'Aceptar',
  },
} satisfies Meta<typeof AntButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Botón principal
export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

// Botón por defecto
export const Default: Story = {
  args: {
    type: 'default',
  },
};

// Botón de texto
export const Text: Story = {
  args: {
    type: 'text',
  },
};

// Botón enlace
export const Link: Story = {
  args: {
    type: 'link',
  },
};
