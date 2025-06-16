import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

declare module '@mui/material/Typography' {
    interface TypographyPropsColorOverrides {
        white : true;
    }
}

const MuiTypographyWhite : MuiCssStyle = {
    color: themeVariables.colors.material.white.main,
};

export default MuiTypographyWhite;