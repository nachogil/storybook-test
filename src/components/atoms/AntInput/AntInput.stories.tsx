import type { Meta, StoryObj } from '@storybook/react-vite';

import { AntInput } from './AntInput';

// Historias para el campo de texto atómico de Ant Design
const meta = {
  component: AntInput,
  tags: ['ai-generated'],
  args: {
    placeholder: 'Escribe aquí...',
  },
} satisfies Meta<typeof AntInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Campo vacío con placeholder
export const Empty: Story = {};

// Campo con valor
export const Filled: Story = {
  args: {
    value: 'Texto de ejemplo',
  },
};

// Campo deshabilitado
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'No editable',
  },
};
