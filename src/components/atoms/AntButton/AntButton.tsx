import { Button, type ButtonProps } from 'antd';

/**
 * Botón atómico basado en Ant Design.
 *
 * Es un wrapper muy ligero para poder ubicarlo dentro de Atomic Design
 * y personalizarlo sin tocar la librería subyacente.
 */
export function AntButton(props: ButtonProps) {
  return <Button {...props} />;
}
