import type { Meta, StoryObj } from '@storybook/react-vite';

import { AntShipmentCard } from './AntShipmentCard';

// Historias para la tarjeta de envío con Ant Design
const meta = {
  component: AntShipmentCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof AntShipmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    origin: 'Valencia',
    destination: 'Madrid',
    status: 'pending',
    date: '2026-10-02',
  },
};

export const InTransit: Story = {
  args: {
    origin: 'Barcelona',
    destination: 'Sevilla',
    status: 'in-transit',
    date: '2026-10-02',
  },
};

export const Delivered: Story = {
  args: {
    origin: 'Bilbao',
    destination: 'A Coruña',
    status: 'delivered',
    date: '2026-10-01',
  },
};
