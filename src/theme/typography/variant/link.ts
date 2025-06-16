import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        link : true;
    }
}

const MuiTypographyLink : MuiCssStyle = {
    color: `${themeVariables.colors.material.white.main} !important`, // We use important here, since link overrides
    cursor: 'pointer',
    fontStyle: 'italic',
    fontWeight: 500,
};

export default MuiTypographyLink;