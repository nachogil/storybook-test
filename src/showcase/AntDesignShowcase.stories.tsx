import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';

/**
 * Showcase de componentes comunes de Ant Design.
 *
 * Este archivo agrupa varios componentes base para poder verlos
 * juntos en Storybook sin tener que crear un archivo por cada uno.
 */

const selectOptions = [
  { value: 'valencia', label: 'Valencia' },
  { value: 'madrid', label: 'Madrid' },
  { value: 'barcelona', label: 'Barcelona' },
];

const tableColumns = [
  { title: 'Origen', dataIndex: 'origin', key: 'origin' },
  { title: 'Destino', dataIndex: 'destination', key: 'destination' },
  { title: 'Estado', dataIndex: 'status', key: 'status' },
];

const tableData = [
  {
    key: '1',
    origin: 'Valencia',
    destination: 'Madrid',
    status: 'Entregado',
  },
  {
    key: '2',
    origin: 'Barcelona',
    destination: 'Sevilla',
    status: 'En tránsito',
  },
];

function AntDesignShowcase() {
  return (
    <Space orientation="vertical" size="middle" style={{ display: 'flex' }}>
      <div>
        <h3>Button</h3>
        <Button type="primary">Primario</Button>{' '}
        <Button>Default</Button>{' '}
        <Button type="dashed">Dashed</Button>{' '}
        <Button type="link">Link</Button>
      </div>

      <div>
        <h3>Input</h3>
        <Input placeholder="Escribe algo..." style={{ width: 240 }} />
      </div>

      <div>
        <h3>Select</h3>
        <Select
          defaultValue="valencia"
          options={selectOptions}
          style={{ width: 240 }}
        />
      </div>

      <div>
        <h3>Tag</h3>
        <Tag color="blue">Azul</Tag>
        <Tag color="green">Verde</Tag>
        <Tag color="orange">Naranja</Tag>
        <Tag color="red">Rojo</Tag>
      </div>

      <div>
        <h3>Card</h3>
        <Card title="Título de la tarjeta" style={{ width: 300 }}>
          <p>Contenido de ejemplo dentro de una Card de Ant Design.</p>
        </Card>
      </div>

      <div>
        <h3>Modal</h3>
        <Button
          type="primary"
          onClick={() =>
            Modal.info({
              title: 'Modal de ejemplo',
              content: 'Este es un modal lanzado desde el showcase.',
            })
          }
        >
          Abrir modal
        </Button>
      </div>

      <div>
        <h3>Table</h3>
        <Table
          dataSource={tableData}
          columns={tableColumns}
          pagination={false}
          size="small"
        />
      </div>
    </Space>
  );
}

const meta = {
  component: AntDesignShowcase,
  tags: ['ai-generated'],
} satisfies Meta<typeof AntDesignShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {};
