import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiTypographyWhite from './color/white';
import MuiTypographyPrimary from './color/primary';
import MuiTypographyBold from './variant/bold';
import MuiTypographyMedium from './variant/medium';
import MuiTypographySemiBold from './variant/semiBold';
import MuiTypographyLink from './variant/link';
import MuiTypographyItalic from './variant/italic';
import MuiTypographyRegular from './variant/regular';

export const MuiTypography : {
    defaultProps ?: ComponentsProps['MuiTypography'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiTypography'];
    variants ?: ComponentsVariants<Theme>['MuiTypography'];
  } = {
      // TODO: revisit
      //   defaultProps: {
      //       color: 'white',
      //   },
      variants: [{
          props: {
              variant: 'bold',
          },
          style: MuiTypographyBold,
      }, {
          props: {
              variant: 'medium',
          },
          style: MuiTypographyMedium,
      }, {
          props: {
              variant: 'semi-bold',
          },
          style: MuiTypographySemiBold,
      }, {
          props: {
              variant: 'italic',
          },
          style: MuiTypographyItalic,
      }, {
          props: {
              variant: 'regular',
          },
          style: MuiTypographyRegular,
      }, {
          props: {
              variant: 'link',
          },
          style: MuiTypographyLink,
      }, {
          props: {
              color: 'primary',
          },
          style: MuiTypographyPrimary,
      }, {
          props: {
              color: 'white',
          },
          style: MuiTypographyWhite,
      }],
  };