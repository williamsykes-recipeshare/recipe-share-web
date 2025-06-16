import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        bold : true;
    }
}

const MuiTypographyBold : MuiCssStyle = {
    fontWeight: 700,
};

export default MuiTypographyBold;