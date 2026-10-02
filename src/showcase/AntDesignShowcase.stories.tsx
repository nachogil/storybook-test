import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Radio,
  Select,
  Space,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'antd';

/**
 * Showcase de componentes comunes de Ant Design con el estilo de eaship.io.
 *
 * Agrupa componentes típicos de un SaaS de logística (TMS) para verlos
 * juntos en Storybook sin crear un archivo por cada uno.
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

const tabItems = [
  { key: '1', label: 'Pendientes', children: 'Envíos pendientes de asignación.' },
  { key: '2', label: 'En ruta', children: 'Envíos actualmente en tránsito.' },
  { key: '3', label: 'Entregados', children: 'Envíos completados.' },
];

const collapseItems = [
  {
    key: '1',
    label: 'Detalles del envío',
    children: <p>Información completa del envío y seguimiento.</p>,
  },
  {
    key: '2',
    label: 'Documentación',
    children: <p>Albaranes, carta de porte y CMR.</p>,
  },
];

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'shipments', label: 'Envíos' },
  { key: 'carriers', label: 'Transportistas' },
  { key: 'invoices', label: 'Facturas' },
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
        <h3>DatePicker</h3>
        <DatePicker placeholder="Fecha de envío" />
      </div>

      <div>
        <h3>Tag / Badge</h3>
        <Tag color="blue">Azul</Tag>
        <Tag color="green">Verde</Tag>
        <Tag color="orange">Naranja</Tag>
        <Tag color="red">Rojo</Tag>
        <Badge count={5} style={{ marginLeft: 16 }} />
        <Badge status="success" text="Activo" style={{ marginLeft: 16 }} />
      </div>

      <div>
        <h3>Alert</h3>
        <Alert
          title="Información importante"
          description="El envío ha sido asignado correctamente."
          type="info"
          showIcon
        />
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

      <div>
        <h3>Form</h3>
        <Form layout="inline" style={{ maxWidth: 600 }}>
          <Form.Item label="Origen">
            <Input placeholder="Ciudad origen" />
          </Form.Item>
          <Form.Item label="Destino">
            <Input placeholder="Ciudad destino" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Buscar</Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h3>Tabs</h3>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>

      <div>
        <h3>Steps</h3>
        <Steps
          current={1}
          items={[
            { title: 'Solicitado', content: 'Pedido recibido' },
            { title: 'Asignado', content: 'Transportista asignado' },
            { title: 'Entregado', content: 'Entrega confirmada' },
          ]}
        />
      </div>

      <div>
        <h3>Pagination</h3>
        <Pagination defaultCurrent={1} total={50} />
      </div>

      <div>
        <h3>Switch / Checkbox / Radio</h3>
        <Switch defaultChecked />{' '}
        <Checkbox defaultChecked>Confirmado</Checkbox>{' '}
        <Radio.Group defaultValue="a">
          <Radio value="a">Nacional</Radio>
          <Radio value="b">Internacional</Radio>
        </Radio.Group>
      </div>

      <div>
        <h3>Collapse</h3>
        <Collapse items={collapseItems} defaultActiveKey={['1']} />
      </div>

      <div>
        <h3>Breadcrumb</h3>
        <Breadcrumb
          items={[
            { title: 'Inicio' },
            { title: 'Envíos' },
            { title: 'Detalle' },
          ]}
        />
      </div>

      <div>
        <h3>Menu</h3>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['shipments']}
          items={menuItems}
        />
      </div>

      <div>
        <h3>Tooltip</h3>
        <Tooltip title="Información adicional al pasar el ratón">
          <Button>Hover sobre mí</Button>
        </Tooltip>
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
