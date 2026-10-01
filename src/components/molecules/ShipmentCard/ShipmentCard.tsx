import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Propiedades de la tarjeta de envío.
 *
 * Es una molécula porque combina varios átomos:
 * Card, Badge y Button.
 */
export interface ShipmentCardProps {
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered';
}

/**
 * Muestra un envío con origen, destino y estado.
 */
export function ShipmentCard({
  origin,
  destination,
  status,
}: ShipmentCardProps) {
  const statusLabels = {
    pending: 'Pendiente',
    'in-transit': 'En tránsito',
    delivered: 'Entregado',
  };

  const badgeVariant = status === 'delivered' ? 'default' : 'secondary';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {origin} → {destination}
        </CardTitle>
        <CardDescription>Estado del envío</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant={badgeVariant}>{statusLabels[status]}</Badge>
      </CardContent>
      <CardFooter>
        <Button size="sm">Ver detalles</Button>
      </CardFooter>
    </Card>
  );
}
