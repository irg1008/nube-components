import { getDefaultColorTheme } from '@tldraw/tldraw';

export const getAlternativeLightTheme = () => {
  const theme = getDefaultColorTheme({ isDarkMode: false });
  theme.grey.solid = '#fff';
  return theme;
};
