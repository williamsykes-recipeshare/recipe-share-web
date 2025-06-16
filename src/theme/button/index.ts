import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiButtonOutlined from './variant/outlined';
import MuiButtonPrimary from './color/primary';

export const MuiButton : {
    defaultProps ?: ComponentsProps['MuiButton'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiButton'];
    variants ?: ComponentsVariants<Theme>['MuiButton'];
  } = {
      variants: [{
          props: {
              variant: 'outlined',
          },
          style: MuiButtonOutlined,
      }, {
          props: {
              color: 'primary',
          },
          style: MuiButtonPrimary,
      }],
  };