import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        italic : true;
    }
}

const MuiTypographyItalic : MuiCssStyle = {
    fontStyle: 'italic',
};

export default MuiTypographyItalic;