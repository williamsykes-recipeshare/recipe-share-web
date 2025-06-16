import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material';
import MuiPaperInput from './variant/input';
import MuiPaperPage from './variant/page';
import MuiPaperCard from './variant/card';
import MuiPaperTitle from './variant/title';
import MuiPaperSubTitle from './variant/subTitle';
import MuiPaperBackground from './color/background';

export const MuiPaper : {
    defaultProps ?: ComponentsProps['MuiPaper'];
    styleOverrides ?: ComponentsOverrides<Theme>['MuiPaper'];
    variants ?: ComponentsVariants<Theme>['MuiPaper'];
  } = {
      variants: [{
          props: {
              variant: 'input',
          },
          style: MuiPaperInput,
      }, {
          props: {
              variant: 'page',
          },
          style: MuiPaperPage,
      }, {
          props: {
              variant: 'title',
          },
          style: MuiPaperTitle,
      }, {
          props: {
              variant: 'sub-title',
          },
          style: MuiPaperSubTitle,
      }, {
          props: {
              variant: 'card',
          },
          style: MuiPaperCard,
      }, {
          props: {
              color: 'background',
          },
          style: MuiPaperBackground,
      }],
  };