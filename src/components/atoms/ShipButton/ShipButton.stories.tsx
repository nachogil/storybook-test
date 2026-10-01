import type { Meta, StoryObj } from '@storybook/react-vite';

import { ShipButton } from './ShipButton';

// Historias para el botón atómico ShipButton
const meta = {
  component: ShipButton,
  tags: ['ai-generated'],
  args: {
    children: 'Enviar',
  },
} satisfies Meta<typeof ShipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variante principal
export const Default: Story = {};

// Variante outline
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

// Variante destructiva
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

// Variante pequeña
export const Small: Story = {
  args: {
    size: 'sm',
  },
};
