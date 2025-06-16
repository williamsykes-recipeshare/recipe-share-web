import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

declare module '@mui/material/Paper' {
    interface PaperPropsColorOverrides {
        'background' : true;
    }
}

const MuiPaperBackground : MuiCssStyle = {
    backgroundColor: themeVariables.colors.material.background.default,
};

export default MuiPaperBackground;