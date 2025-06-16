import { MuiCssStyle } from '../../../models/helper';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        regular : true;
    }
}

const MuiTypographyRegular : MuiCssStyle = {
    fontWeight: 400,
};

export default MuiTypographyRegular;