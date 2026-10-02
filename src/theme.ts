import type { ThemeConfig } from 'antd';

/**
 * Tokens base del sistema de diseño.
 *
 * Aquí defines colores, tipografía, espaciado y radios.
 * Más adelante puedes sincronizar estos valores con los de Figma.
 */
export const tokens = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    text: '#262626',
    textSecondary: '#595959',
    background: '#ffffff',
    border: '#d9d9d9',
  },
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  borderRadius: 6,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

/**
 * Configuración de tema de Ant Design (ConfigProvider).
 *
 * Conecta los tokens de arriba con los tokens que entiende Ant Design.
 */
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    borderRadius: tokens.borderRadius,
    fontFamily: tokens.fontFamily,
    colorText: tokens.colors.text,
    colorBorder: tokens.colors.border,
  },
};
