import type { Meta, StoryObj } from '@storybook/react-vite';

import { ShipmentCard } from './ShipmentCard';

// Historias para la tarjeta de envío (molécula)
const meta = {
  component: ShipmentCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof ShipmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Envío pendiente
export const Pending: Story = {
  args: {
    origin: 'Valencia',
    destination: 'Madrid',
    status: 'pending',
  },
};

// Envío en tránsito
export const InTransit: Story = {
  args: {
    origin: 'Barcelona',
    destination: 'Sevilla',
    status: 'in-transit',
  },
};

// Envío entregado
export const Delivered: Story = {
  args: {
    origin: 'Bilbao',
    destination: 'A Coruña',
    status: 'delivered',
  },
};
