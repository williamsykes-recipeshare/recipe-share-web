import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        'semi-bold' : true;
    }
}

const MuiTypographySemiBold : MuiCssStyle = {
    fontWeight: 600,
};

export default MuiTypographySemiBold;