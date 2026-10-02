import { Input, type InputProps } from 'antd';

/**
 * Campo de texto atómico basado en Ant Design.
 *
 * Wrapper para ubicarlo dentro del sistema de diseño atómico.
 */
export function AntInput(props: InputProps) {
  return <Input {...props} />;
}
