import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

declare module '@mui/material/Typography' {
    interface TypographyPropsColorOverrides {
        'primary' : true;
    }
}

const MuiTypographyPrimary : MuiCssStyle = {
    color: themeVariables.colors.material.primary.main,
};

export default MuiTypographyPrimary;