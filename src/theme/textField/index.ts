import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiTextFieldStandard from './variant/standard';

export const MuiTextField : {
    defaultProps ?: ComponentsProps['MuiTextField'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiTextField'];
    variants ?: ComponentsVariants<Theme>['MuiTextField'];
  } = {
      variants: [{
          props: {
              variant: 'standard',
          },
          style: MuiTextFieldStandard,
      }],
  };