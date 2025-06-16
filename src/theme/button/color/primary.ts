import { darken } from '@mui/material';
import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

const MuiButtonPrimary : MuiCssStyle = {
    color: themeVariables.colors.material.white.main,
    borderColor: '#7196BC9A',
    background: themeVariables.colors.material.primary.main,
    ':before': {
        borderColor: '#7196BC9A',
    },
    ':hover': {
        color: themeVariables.colors.material.white.main,
        background: darken(themeVariables.colors.material.primary.main, 0.1),
        borderColor: darken('#7196BC9A', 0.1),
        ':before': {
            borderColor: darken('#7196BC9A', 0.1),
        },
    },
};

export default MuiButtonPrimary;