import { MuiCssStyle } from '../../../models/helper';
import themeVariables from '../../themeVariables';

declare module '@mui/material/Avatar' {
    interface AvatarPropsColorOverrides {
        'primary' : true;
    }
}

const MuiAvatarPrimary : MuiCssStyle = {
    backgroundColor: themeVariables.colors.material.primary.main,
};

export default MuiAvatarPrimary;