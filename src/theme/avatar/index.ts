import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiAvatarPrimary from './color/primary';

export const MuiAvatar : {
    defaultProps ?: ComponentsProps['MuiAvatar'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiAvatar'];
    variants ?: ComponentsVariants<Theme>['MuiAvatar'];
  } = {
      variants: [
          {
              props: {
                  color: 'primary',
              },
              style: MuiAvatarPrimary,
          },
      ],
  };