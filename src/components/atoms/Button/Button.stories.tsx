import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './Button';

// Metadatos de las historias para el componente Button (átomo)
const meta = {
  component: Button,
  tags: ['ai-generated'],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variante principal del botón
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

// Variante secundaria del botón
export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

// Variante grande del botón
export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

// Variante pequeña del botón
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

// Historia de verificación: comprueba que el CSS global se cargó correctamente
export const CssCheck: Story = {
  args: {
    primary: true,
    label: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // El botón principal usa el color #555ab9, que equivale a rgb(85, 90, 185)
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(85, 90, 185)');
  },
};
