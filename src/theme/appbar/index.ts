import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiAppBarHeader from './variant/header';
import MuiAppBarTransparent from './variant/transparent';

export const MuiAppBar : {
    defaultProps ?: ComponentsProps['MuiAppBar'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiAppBar'];
    variants ?: ComponentsVariants<Theme>['MuiAppBar'];
  } = {
      variants: [
          {
              props: {
                  variant: 'header',
              },
              style: MuiAppBarHeader,
          }, {
              props: {
                  variant: 'transparent',
              },
              style: MuiAppBarTransparent,
          },
      ],
  };