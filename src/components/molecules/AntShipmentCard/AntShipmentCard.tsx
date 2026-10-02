import { Button, Card, Tag } from 'antd';

/**
 * Molécula: tarjeta de envío con Ant Design.
 *
 * Combina átomos de Ant Design (Card, Button, Tag) para mostrar
 * la información básica de un envío.
 */
export interface AntShipmentCardProps {
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered';
  date: string;
}

export function AntShipmentCard({
  origin,
  destination,
  status,
  date,
}: AntShipmentCardProps) {
  const statusConfig = {
    pending: { label: 'Pendiente', color: 'orange' as const },
    'in-transit': { label: 'En tránsito', color: 'blue' as const },
    delivered: { label: 'Entregado', color: 'green' as const },
  };

  const { label, color } = statusConfig[status];

  return (
    <Card title={`${origin} → ${destination}`} style={{ maxWidth: 360 }}>
      <p style={{ margin: 0, marginBottom: 8 }}>Fecha: {date}</p>
      <Tag color={color}>{label}</Tag>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" size="small">
          Ver detalles
        </Button>
      </div>
    </Card>
  );
}
