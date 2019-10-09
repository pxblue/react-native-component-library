import { createTheming } from '@callstack/react-theme-provider';
import { gray, white, blue, red, lightBlue } from '@pxblue/colors';
import { TextStyle } from 'react-native';

type Font = {
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
}

export interface Theme {
  roundness: number;
  colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onPrimary: string;
  };
  fonts: {
    bold: Partial<Font>;
    regular: Partial<Font>;
    medium: Partial<Font>;
    light: Partial<Font>;
    thin: Partial<Font>;
  };
  sizes: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
};

// TODO: This default theme is the PX Blue theme...it should be extracted to the @pxblue/themes package
// and this default theme should be something a bit more generic/material (colors).
const { ThemeProvider, withTheme } = createTheming<Theme>({
  roundness: 3,
  fonts: {
    bold: {
      //fontFamily: 'Open Sans',
      fontWeight: '600'
    },
    regular: {
      //fontFamily: 'Open Sans',
      fontWeight: 'normal'
    },
    medium: {
      //fontFamily: 'Open Sans',
      fontWeight: '400'
    },
    light: {
      //fontFamily: 'Open Sans',
      fontWeight: '300'
    },
    thin: {
      //fontFamily: 'Open Sans',
      fontWeight: '200'
    }
  },
  colors: {
    primary: blue[500],
    background: gray[50],
    surface: white[50],
    accent: lightBlue[500],
    error: red[500],
    text: gray[500],
    onPrimary: white[50]
  },
  sizes: {
    small: 12,
    medium: 16,
    large: 24,
    extraLarge: 34
  }
});

type WithTheme<T> = T & {
  theme: Theme;
}

export {
  ThemeProvider,
  WithTheme,
  withTheme
};