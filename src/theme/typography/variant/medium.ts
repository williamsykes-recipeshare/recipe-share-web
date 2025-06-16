import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        medium : true;
    }
}

const MuiTypographyMedium : MuiCssStyle = {
    fontWeight: 500,
};

export default MuiTypographyMedium;