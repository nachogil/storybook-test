import type { ThemeConfig } from 'antd';

/**
 * Tokens base del sistema de diseño.
 *
 * Aquí defines colores, tipografía, espaciado y radios.
 * Más adelante puedes sincronizar estos valores con los de Figma.
 */
/**
 * Tokens base del sistema de diseño, extraídos de eaship.io.
 *
 * Colores principales obtenidos del CSS de la web:
 * - primary: #26acba (turquesa botones y acentos)
 * - primaryHover: #44cccc (hover)
 * - soft: #e0f7f8 (fondos suaves)
 * - text: #485463 (texto principal)
 * - background: #ffffff
 * - surface: #f8f9f9 (fondos alternativos)
 */
export const tokens = {
  colors: {
    primary: '#26acba',
    primaryHover: '#44cccc',
    soft: '#e0f7f8',
    accent: '#64d7dd',
    success: '#52c41a',
    warning: '#faad14',
    error: '#EF6B51',
    text: '#485463',
    textSecondary: '#6b7280',
    background: '#ffffff',
    surface: '#f8f9f9',
    border: '#d0d0d0',
  },
  fontFamily:
    "'Avenir Next', 'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  borderRadius: 8,
  boxShadow: '4px 4px 10px 0px rgba(0,0,0,0.1)',
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
    colorPrimaryHover: tokens.colors.primaryHover,
    colorPrimaryActive: '#1e8e9a',
    colorText: tokens.colors.text,
    colorTextSecondary: tokens.colors.textSecondary,
    colorBgLayout: tokens.colors.surface,
    colorBorder: tokens.colors.border,
    borderRadius: tokens.borderRadius,
    fontFamily: tokens.fontFamily,
    boxShadow: tokens.boxShadow,
    boxShadowSecondary: tokens.boxShadow,
  },
};
