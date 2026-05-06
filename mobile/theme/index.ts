/**
 * Toftrees Churchyard Surveyor — Dark Theme
 * Design tokens and theme configuration for React Native Paper.
 */
import { MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = {
  displayLarge: { fontFamily: 'System', fontSize: 57, lineHeight: 64 },
  displayMedium: { fontFamily: 'System', fontSize: 45, lineHeight: 52 },
  displaySmall: { fontFamily: 'System', fontSize: 36, lineHeight: 44 },
  headlineLarge: { fontFamily: 'System', fontSize: 32, lineHeight: 40 },
  headlineMedium: { fontFamily: 'System', fontSize: 28, lineHeight: 36 },
  headlineSmall: { fontFamily: 'System', fontSize: 24, lineHeight: 32 },
  titleLarge: { fontFamily: 'System', fontSize: 22, lineHeight: 28 },
  titleMedium: { fontFamily: 'System', fontSize: 16, lineHeight: 24, fontWeight: '500' as const },
  titleSmall: { fontFamily: 'System', fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  bodyLarge: { fontFamily: 'System', fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: 'System', fontSize: 14, lineHeight: 20 },
  bodySmall: { fontFamily: 'System', fontSize: 12, lineHeight: 16 },
  labelLarge: { fontFamily: 'System', fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  labelMedium: { fontFamily: 'System', fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  labelSmall: { fontFamily: 'System', fontSize: 11, lineHeight: 16, fontWeight: '500' as const },
};

/** Toftrees dark theme — earthy tones with stone/moss accent palette */
export const toftreesTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#A8C896',           // Moss green
    onPrimary: '#1A3300',
    primaryContainer: '#2E5216',
    onPrimaryContainer: '#C4E5B0',
    secondary: '#C4B99A',         // Sandstone
    onSecondary: '#2D2510',
    secondaryContainer: '#453B24',
    onSecondaryContainer: '#E1D5B5',
    tertiary: '#9ECBCE',          // Lichen blue-grey
    onTertiary: '#003436',
    tertiaryContainer: '#1E494D',
    onTertiaryContainer: '#BAEAEB',
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    background: '#1A1C18',        // Deep forest dark
    onBackground: '#E3E3DB',
    surface: '#1A1C18',
    onSurface: '#E3E3DB',
    surfaceVariant: '#43483E',
    onSurfaceVariant: '#C3C8BA',
    outline: '#8D9285',
    outlineVariant: '#43483E',
    inverseSurface: '#E3E3DB',
    inverseOnSurface: '#2F312C',
    inversePrimary: '#3F6D21',
    elevation: {
      level0: 'transparent',
      level1: '#21251E',
      level2: '#262B22',
      level3: '#2B3126',
      level4: '#2D3328',
      level5: '#30372B',
    },
    surfaceDisabled: 'rgba(227, 227, 219, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 219, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.4)',
  },
  fonts: configureFonts({ config: fontConfig }),
};

/** Spacing scale for consistent layout */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Border radius tokens */
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
